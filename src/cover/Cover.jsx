import React from 'react'
import './Cover.css'
export const CoverPage = () => {
  return (
    <div className='site-wrapper'>
      <div className='site-wrapper-inner'>
        <div className='container'>
          <div className='masthead clearfix'>
            <div className='container inner'>
                {/* <h3 className='masthead-brand'>SAFESEND</h3> */}
                <nav>
                <ul className='nav masthead-nav'>
                  <li className='active'><a href='/'>Home</a></li>
                  <li><a href='/info'>Learn More</a></li>

                </ul>
                </nav>      
            </div>
          </div>
          <div className='inner cover'>
            <h1 className='cover-heading'>SAFESEND</h1>
            {/* <p className='lead'>This is a Secure Messaging System, designed using Elliptic Curve Cryptography based Encryption and Decryption methods.
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
                <li>Firstly, the ephemeral private key is generated using a random number.</li>
                <li></li>
              </ul>
              </p>
              <p className='lead'>
              <h3>
              How the Decryption works?
              </h3>
              </p> */}
            <p className='lead'>
              <a href='/chat' className='btn btn-lg btn-default'>Click Here to see a Demo of our messaging system</a>
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
