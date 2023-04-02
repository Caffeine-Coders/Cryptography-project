#p is 256 bit prime number that defines the field for the curve
# a and b are coefficients used in the curve equation 'y^2 = x^3 + ax + b''
# base_x and base_y are x and y coordinates of the base point (generator)
# n is order of generator point
import hmac
import random
import secrets
import hashlib
import os
from Crypto.Cipher import AES
from Crypto.Hash import HMAC, SHA256
from Crypto.Random import  get_random_bytes
from Crypto.Util.Padding import pad, unpad

# parameters used in 'secp256k1' curve
p = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
a = 0x0000000000000000000000000000000000000000000000000000000000000000
b = 0x0000000000000000000000000000000000000000000000000000000000000007
G = (0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798,
     0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8)
n = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141

message = "Hello,world!"
Q=(10,15)
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


def point_multiplication(k,P,p,a):

    Q = P
    R = None
    while k>0:
        if k%2 == 1:
            R = point_addition(R,Q,p,a) if R is not None else Q
        Q = point_addition(Q,Q,p,a)
        k //=2
    return R

# generating public key and private key
# key 1 is for sender
# key 2 is for receiver
private_key1 = secrets.randbelow(n)
public_key1 = point_multiplication(private_key1,G,p,a)

private_key2 = secrets.randbelow(n)
public_key2 = point_multiplication(private_key2,G,p,a)
iv = os.urandom(16)
# def ecies_encryption(public_key,plaintext):
    # print(plaintext)
    # tmp_private_key = secrets.randbelow(n)
    # tmp_public_key = point_multiplication(tmp_private_key, G,p,a)
    # # print(tmp_public_key[0].to_bytes(32,'big'))
    #
    # shared_secret = point_multiplication(private_key1,public_key2,p,a)
    # hash_shared_secret = hashlib.sha256(shared_secret[0].to_bytes(32,'big')).digest()
    # cipher = AES.new(hash_shared_secret,AES.MODE_CBC,iv)
    # ct=cipher.encrypt(pad(plaintext.encode(),AES.block_size))
    # # hash_pk2 = hashlib.sha256(public_key2[0].to_bytes(32,'big')).digest()
    # # cipher2 = AES.new(hash_pk2,AES.MODE_CBC,iv)
    # # sk = cipher2.encrypt(pad(shared_secret.encode(),AES.block_size))
    # return shared_secret,ct
    # # hash_shared_secret = hashlib.sha256(shared_secret[0].to_bytes(32,'big')).digest()
    # # enc_key = hash_shared_secret[:16]
    # # mac_key = hash_shared_secret[16:32]
    # # # print(mac_key)
    # # iv = os.urandom(16)
    # # # print(iv)
    # # cipher = AES.new(enc_key,AES.MODE_CBC,iv)
    # # ciphertext = cipher.encrypt(pad(plaintext.encode(),AES.block_size))
    # # hmac_sha256 = HMAC.new(mac_key,iv+ciphertext,SHA256).digest()
    # # # print(len(hmac_sha256))
    # # # print(hmac_sha256)
    # # return tmp_public_key[0].to_bytes(32,'big') + iv + ciphertext + hmac_sha256

# def ecies_decryption(private_key, ciphertext):
#     shared_secret = ciphertext[0]
#     hash_shared_secret = hashlib.sha256(shared_secret[0].to_bytes(32, 'big')).digest()
#     cipher = AES.new(hash_shared_secret, AES.MODE_CBC, iv)
#     decrypted_text = unpad(cipher.decrypt(ciphertext[1]),AES.block_size)
#
#     return decrypted_text.decode('utf-8')
#     # print(ciphertext)
#
# #     tmp_public_key = ciphertext[:32]
# #     iv = ciphertext[32:48]
# #     ct = ciphertext[48:-32]
# #     hmac_tag = ciphertext[-32:]
# #     # print(hmac_tag)
# #     shared_secret = point_multiplication(private_key,public_key2,p,a)
# #     hash_shared_secret = hashlib.sha256(shared_secret[0].to_bytes(32, 'big')).digest()
# #     enc_key = hash_shared_secret[:16]
# #     mac_key = hash_shared_secret[16:32]
# #     # print(mac_key)
# #     hmac_sha256 = HMAC.new(mac_key, iv + ciphertext, SHA256).digest()
# #     # print(hmac_sha256)
# #     if hmac_tag != hmac_sha256:
# #         raise ValueError("HMAC Verification Failed. Message has been tempered")
# #     cipher = AES.new(enc_key,AES.MODE_CBC,iv)
# #     decrypted_text = unpad(cipher.decrypt(ct),AES.block_size)
# #     return decrypted_text

# generated_cipher = ecies_encryption(public_key2,message)
# print(generated_cipher)
# decrypted_message = ecies_decryption(private_key2,generated_cipher)
# print(decrypted_message)
# print(decrypted_message == message)
# digital signature and verification

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
signature_val = sign_message(message,private_key1)
print(signature_val[0])
#
# def verify_sign(m,sign,Q):
#     print(m)
#     r,s = sign
#     if not( 1<= r < n and 1 <= s <n):
#         return False
#     h = hashlib.sha256(m.encode()).digest()
#     # hash1 = int(h,16)
#     # print(hash1)
#     s_inverse = pow(s,-1,n)
#     u1 = (int.from_bytes(h,byteorder='big')*s_inverse)%n
#     u2 = (r * s_inverse) % n
#     P = point_addition(point_multiplication(u1, G, p, a),point_multiplication(u2,public_key1,p,a),p,a)
#     # print(P)
#     if P is None:
#         return False
#     v = P[0] % n
#     print(v)
#     return v==r
# # message1 = "random shit"
# verification = verify_sign(message,signature_val,Q)
# if verification == True:
#     print("Verified")
# else:
#     print("Verification failed")