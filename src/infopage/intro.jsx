import React from 'react'
// import './Cover.css'
import './intro.css'
import ecc_image from './ecc.png'
import sign_image from './sign.png'
import encrypt_image from './encrypt.png'
import decrypt_image from './decrypt.png'
export const Intro = () => {
  return (
   <>
<div className='header'>
            <div class="container px-4 px-lg-5 h-100">
                <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                    <div class="col-lg-8 align-self-end">
                        <h1 class="text-white font-weight-bold">Elliptic Curve Cryptography</h1>
                        <hr class="divider" />
                    </div>
                    <div class="col-lg-8 align-self-baseline">
                        <p class="text-white-75 mb-5"><h4> What is Elliptic Curve Cryptography?</h4>
                        Elliptic Curve Cryptography is a type of public key cryptography that is based on the algebraic structure of elliptic curves over finite fields.
              ECC performs the job of encryption, decryption as well as generation of digital signatures and their verification.
                        </p>
                        
                        <img src={ecc_image} />
                        <br/><br/><br/>
                        <a class="btn btn-light btn-xl about-btn" href="#about">Find Out More</a>
                    </div>
                </div>
            </div>
            </div>  
            <div id='about' className='sign-div'>
     <hr />
        <h3>Key Generation in ECC</h3>
        <div className='sign-image'>
        <img src={sign_image} />         
        </div>
        <div className='sign-content'>
      <ul>
        <li> A set of Private and Public Key is generated for each user.</li>
        <li>The generated public keys of each user can be shared and can be used for encryption process.</li>
        <li>The private keys of each user is known only to the user.</li>
        <li>Then, a secret key is calculated using the combination of public and private keys.</li>
        <li>This secret key is shared among the 2 communicating parties.</li>
      </ul>
      

        </div>
     </div>
 

     <div id='about' className='encryption-div'>
     <hr />
        <h3>Encryption & Digital Signature in ECC</h3>
        <div className='encryption-image'>
            <img src={encrypt_image} />
        </div>
        <div className='encryption-content'>
        <ul>
                <li>Firstly, the message is signed using the sender's private key.</li>
               <li>Now, in the encryption process the sender uses symmetric key encryption algorithm such as AES, to encrypt the 
                message using the shared secret key generated.</li>
                <li>After that, the shared secret key will also be encrypted using the receiver's public key.</li>
                <li>Then, the encrypted message, encrypted shared secret along with the digital signature is sent to the receiver.</li>
              </ul>
        </div>
     </div>

     <div id='about' className='decryption-div'>
     <hr />
        <h3>Decryption & Signature Verification in ECC</h3>
        <div className='decryption-image'>
        <img src={decrypt_image}/>
        </div>
        <div className='decryption-content'>
        <ul>
            <li>The receiver obtains the encrypted message and encrypted shared secret key. </li>
            <li>Now, the receiver decrypts the encrypted shared secret using their own private key.</li>
            <li>Once, the shared secret key is obtained, the receiver now decrypts the encrypted message using this key.</li>
            <li>Then, the plaintext form of the message is sent for the verification of digital signature.</li>
            <li>Once verified, the message is readable by the receiver.</li>
            <li>If the verification fails, that means the message here is tempered and is not original message.</li>
        </ul>
        </div>
     </div>
     </>
  )
}
