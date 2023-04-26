export const Encryption =() => {
var p = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F;
var a = 0x0000000000000000000000000000000000000000000000000000000000000000;
var b = 0x0000000000000000000000000000000000000000000000000000000000000007
var G = (0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798,
    0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8)
var n = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141;
let private_key1 = Math.floor(Math.random()*n) +1;
let public_key1 = point_multiplication(private_key1,G,p,a)
function point_multiplication(n,P,p,a){
    let Q = null
    let R = P
    while(n>0){
        if(n%2 == 1){
            Q = point_addition(Q,R,p,a)
        }
        R = point_doubling(R,p,a)
        n = Math.floor(n/2)
    }
    return Q
}
function point_addition(P,Q,p,a){
    if(P == null){
        return Q
    }
    if (Q == null){
        return P
    }
    if(P.x == Q.x && P.y != Q.y){
        return null
    }
    let s;
    if(P.x == Q.x && P.y == Q.y){
        s = (3 * P.x * P.x +a)*mod_inverse(2*P.y,p)
    }
    else{
        s = (Q.y - P.y) * mod_inverse(Q.x - P.x , p)
    }
    let x = (s*s - P.x - Q.x) % p
    let y = (s * (P.x -x ) - P.y)%p
    return {x:x,y: y}
}
function point_doubling(P,p,a){
    if(P==null){
        return null
    }
    let s = (3* P.x * P.x + a) * mod_inverse(2*P.y,p)
    let x = (s*s - 2*P.x)%p
    let y = (s * (P.x - x ) - P.y) % p
    return {x:x,y:y}
}
function mod_inverse(a,m){
    let m0 = m
    let x0 = 0, x1= 1
    if(m==1){
        return 0
    }
    while(a>1){
        let q = Math.floor(a/m)
        let t = m 
        m = a % m
        a = t
        t = x0
        x0 = x1 - q * x0
        x1 = t
    }
    if(x1<0){
        x1 += m0
    }
    return x1
}
return(
    <div>
        {private_key1}
        <br/>
        [{public_key1.x},{public_key1.y}]
    </div>
)

}