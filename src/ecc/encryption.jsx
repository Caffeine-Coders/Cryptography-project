import {AES, enc} from 'crypto-js'
import { curve } from 'elliptic'
export const Encryption =() => {
    var EC = require('elliptic').ec
    var ec = new EC('secp256k1')
    var key1 = ec.genKeyPair()
    console.log("key",key1)
    var key2 = ec.genKeyPair()
    var shared1 = key1.derive(key2.getPublic())
    var shared2 = key2.derive(key1.getPublic())
    console.log("shared1",shared1.toString(16))
    console.log(shared2)
    const message = "Get ready, it's time for war"
    const iv = enc.Hex.parse('00000000000000000000000000000001')
    const encrypted = AES.encrypt(message,shared1,{iv:iv}).toString()
    const decrypted = AES.decrypt(encrypted,shared2, {iv:iv}).toString(enc.Utf8)
    console.log("original message: ",message)
    console.log("encrypted message",encrypted)
    console.log("decrypted message",decrypted)
    const originalHash = ec.hash().update(message).digest()
    const fakemessage = "hii trial message"
    const decryptedHash = ec.hash().update(decrypted).digest()
    // const signature = val.sign(originalHash)
    const signkey = ec.keyFromPublic(key1.getPublic(),'hex')
    const signature = ec.sign(originalHash,key1)
    const publicKey1 = key1.getPublic()
    const tmp = signature.toDER()
    console.log("temp",tmp)
    const verification = signkey.verify(decryptedHash,tmp)
    // const verification = publicKey1.verify(originalHash,signature)
    console.log("Verified", verification)
   return(
        <div>
            <div>
            Original Message : {message}
            </div>
            <div>
            Encrypted Message : {encrypted}
            </div>
            <div>
                {verification ? (
                    <div>
                    Decrypted Message : {decrypted}
                    </div>
                ) : (
                    <div>
                        Verification Failed
                        </div>
                )
                
            }
            </div>
           
        </div>
    )

    

}