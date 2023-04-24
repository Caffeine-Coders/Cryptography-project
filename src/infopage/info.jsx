import React from 'react'
// import './Cover.css'
import './info.css'
export const Ecc = () => {
  return (
    <div className='site-wrapper'>
      <div className='site-wrapper-inner ' >
        <div className='container '>
          <div className='inner cover'>
            <h1 className='cover-heading'>Elliptic Curve Cryptography</h1>
            <p className='lead'>This is a Secure Messaging System, designed using Elliptic Curve Cryptography based Encryption and Decryption methods.
            </p>
            <p className='lead'>
              <h3>
              What is Elliptic Curve Cryptography?
              </h3>
              Elliptic Curve Cryptography is a type of public key cryptography that is based on the algebraic structure of elliptic curves over finite fields.
              ECC performs the job of encryption, decryption as well as generation of digital signatures and their verification.
              In ECC, public and private keys are generated using elliptic curves.
              The public key is used to encrypt messages and verify digital signatures, while the private key is used to decrypt the messages and create digital signatures.  
            </p>
            <p className='lead'>
              <h3>
              How the Encryption works?
              </h3>
              <ul>
                <li>Firstly, the message is signed using the sender's private key.</li>
                <li>Then, the ephemeral private key is generated using a random number.</li>
                <li>Then a shared secret point is computed on the elliptic curve using the ephemeral private key and the receiver's public key.</li>
                <li>The sender then derives a symmetric key from the computed shared secret point and the ephemeral private key.</li>
                <li>The sender then finally encrypts the message using the symmetric key and a symmetric encryption algorithm such as AES.</li>
              </ul>
              </p>
              <p className='lead'>
              <h3>
              How the Decryption works?
              </h3>
              <ul>
                <li>The receiver obtains the encrypted message and the ephemeral point.</li>
                <li>Then the shared secret point is calculated from the ephemeral point obtained and their private key.</li>
                <li>The receiver derives the same symmetric key as the sender using the computed point and the ephemeral private key.</li>
                <li>Finally the receiver decrypts the message using the symmetric key and the same symmetric encryption algorithm used by the sender.</li>
                <li>Then comes the verification stage, where the decrypted message is verified using the sender's public key.</li>
              </ul>
              </p>
              <p className='lead'>
              <a href='/' className='btn btn-lg btn-default'>Home</a>
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
