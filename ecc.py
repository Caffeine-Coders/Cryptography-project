#p is 256 bit prime number that defines the field for the curve
# a and b are coefficients used in the curve equation 'y^2 = x^3 + ax + b''
# base_x and base_y are x and y coordinates of the base point (generator)
# n is order of generator point
import random
import secrets
import hashlib

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

private_key = secrets.randbelow(n)
public_key = point_multiplication(private_key,G,p,a)


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
signature_val = sign_message(message,private_key)
print(signature_val[0])

def verify_sign(m,sign,Q):
    print(m)
    r,s = sign
    if not( 1<= r < n and 1 <= s <n):
        return False
    h = hashlib.sha256(m.encode()).digest()
    # hash1 = int(h,16)
    # print(hash1)
    s_inverse = pow(s,-1,n)
    u1 = (int.from_bytes(h,byteorder='big')*s_inverse)%n
    u2 = (r * s_inverse) % n
    P = point_addition(point_multiplication(u1, G, p, a),point_multiplication(u2,public_key,p,a),p,a)
    # print(P)
    if P is None:
        return False
    v = P[0] % n
    print(v)
    return v==r
# message1 = "random shit"
verification = verify_sign(message,signature_val,Q)
if verification == True:
    print("Verified")
else:
    print("Verification failed")