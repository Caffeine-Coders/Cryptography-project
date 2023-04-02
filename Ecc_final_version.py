import secrets
import hashlib
import os
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad

# parameters used in 'secp256k1' curve
p = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
a = 0x0000000000000000000000000000000000000000000000000000000000000000
b = 0x0000000000000000000000000000000000000000000000000000000000000007
G = (0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798,
     0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8)
n = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141

def point_multiplication(k,P,p,a):

    Q = P
    R = None
    while k>0:
        if k%2 == 1:
            R = point_addition(R,Q,p,a) if R is not None else Q
        Q = point_addition(Q,Q,p,a)
        k //=2
    return R
def point_addition(P,Q,p,a):
    if P==Q:
        m = (3* pow(P[0],2) + a) * pow(2*P[1],-1,p)
    else:
        m = (Q[1] - P[1])*pow(Q[0] - P[0],-1,p)
    Result_x = (pow(m,2) - P[0] -Q[0]) %p
    Result_y = (P[1] + m*(Result_x - P[0])) % p
    return Result_x, -Result_y %p
# Result = point_addition(P,Q,p,a)
# print(Result[0])

# generating public key and private key

# key 1 is for sender
# key 2 is for receiver
private_key1 = secrets.randbelow(n)
public_key1 = point_multiplication(private_key1,G,p,a)
# print(private_key1)
# print(public_key1)
private_key2 = secrets.randbelow(n)
public_key2 = point_multiplication(private_key2,G,p,a)
# print(private_key2)
# print(public_key2)
iv = os.urandom(16)
message="We are under attack... Get ready for war!"

def sign_message(m,private_key):
    message_hash = hashlib.sha256(m.encode()).digest()
    # hash = int(message_hash,16)
    # print(hash)
    k =secrets.randbelow(n)
    R = point_multiplication(k,G,p,a)
    r = R[0] % n
    k_inverse = pow(k,-1,n)
    s = (int.from_bytes(message_hash,byteorder='big') + private_key*r)* k_inverse % n
    return (r,s)

# print(signature_val)

def verify_sign(m,sign,Q):
    # print(m)
    r,s = sign
    if not( 1<= r < n and 1 <= s <n):
        return False
    h = hashlib.sha256(m.encode()).digest()
    # hash1 = int(h,16)
    # print(hash1)
    s_inverse = pow(s,-1,n)
    u1 = (int.from_bytes(h,byteorder='big')*s_inverse)%n
    u2 = (r * s_inverse) % n
    P = point_addition(point_multiplication(u1, G, p, a),point_multiplication(u2,public_key1,p,a),p,a)
    # print(P)
    if P is None:
        return False
    v = P[0] % n
    # print(v)
    return v==r

ephemeral_private_key = secrets.randbelow(n)
shared_secret = point_multiplication(ephemeral_private_key,public_key2,p,a)
hash_input = shared_secret[0].to_bytes(32,byteorder='big') + iv + b'symmetric_key'
kdf_output = hashlib.sha256(hash_input).digest()

def encryption(m):
    symmetric_key = secrets.randbits(16)
    # print(symmetric_key)
    hash_shared_secret = hashlib.sha256(symmetric_key.to_bytes(32, 'big')).digest()
    cipher = AES.new(hash_shared_secret,AES.MODE_CBC,iv)
    ct=cipher.encrypt(pad(m.encode(),AES.block_size))


    # ephemeral_public_key = ephemeral_private_key * G
    # shared_secret = ephemeral_private_key * public_key2

    symmetric_key_encryption_key = kdf_output[:16]
    cipher2 = AES.new(symmetric_key_encryption_key,AES.MODE_CBC,iv)
    # symmetric_key = str(symmetric_key)
    symmetric_key = symmetric_key.to_bytes(32,byteorder='big')
    symmetric_key_ciphertext = cipher2.encrypt(pad(symmetric_key,AES.block_size))
    return ct,symmetric_key_ciphertext

def decryption(ct,symmetric_key,signature):
    symmetric_key_encryption_key = kdf_output[:16]
    cipher2 = AES.new(symmetric_key_encryption_key, AES.MODE_CBC, iv)
    decrypted_symmetric_key = unpad(cipher2.decrypt(symmetric_key),AES.block_size)
    sym_key = int.from_bytes(decrypted_symmetric_key)
    dec_sym_key = hashlib.sha256(sym_key.to_bytes(32, 'big')).digest()
    cipher = AES.new(dec_sym_key,AES.MODE_CBC,iv)
    decrypted_val = unpad(cipher.decrypt(ct),AES.block_size).decode('utf-8')
    # m1 = "random"
    res =verify_sign(decrypted_val,signature,public_key1)
    return decrypted_val,res
    # print(decrypted_val)
    # print(sym_key)
signature_val = sign_message(message,private_key1)
ct,symm_key = encryption(message)
# print(ct,symm_key)
decrypted_message, signature_verification = decryption(ct,symm_key,signature_val)
if signature_verification == True:
    print("Signature Verified!")
    print("Message is: ",decrypted_message)
else:
    print("Signature not verified")
    print("The message might have been tempered")