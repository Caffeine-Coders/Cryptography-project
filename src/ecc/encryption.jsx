export const Encryption =() => {
var p = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F;
var a = 0x0000000000000000000000000000000000000000000000000000000000000000;
var b = 0x0000000000000000000000000000000000000000000000000000000000000007
var G = (0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798,
    0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8)
var n = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141;
// var private_key1 = Math.floor(Math.random()*n) +1;
const private_key1 = 200;

function pointAdd(P,Q){
    const R = P.add(Q);
    return [R.getX().toJSON(), R.getY().toJSON()];
}
function pointMul(k,P){
    const R = P.mul(k);
    return [R.getX().toJSON(), R.getY().toJSON()];
}
// const tmp = BigInt(private_key1)

// const public_key1 = Number(point_multiplication(private_key1,G,p,a))

// function point_multiplication(k,P,p,a){
// var Q=P
// var R=null;
// while(k>0){
//     if(k%2 === 1){
//         R = point_addition(R,Q,p,a) || Q;
//     }
//     Q = point_addition(Q,Q,p,a);
//     k = Math.floor(k/2)
// }
// return R
// }

// function point_addition(P,Q,p,a){
//     var m;
//     if(P[0]==Q[0] && P[1]== Q[1]){
//         m = (3 * Math.pow(P[0],2) + a) * Math.pow(2*P[1], -1, p)
//     }
//     else{
//         m = (Q[1] - P[1])* Math.pow(Q[0] - P[0],-1,p)
//     }
//     let Result_x = (Math.pow(m,2) - P[0] - Q[0]) % p
//     let Result_y = (P[1] + m * (Result_x - P[0])) % p
//     return [Result_x, -Result_y%p]
// }
return(
    <div>
        {private_key1}
        <br/>
        {/* {public_key1} */}
    </div>
)

}