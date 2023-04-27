import React from 'react'
import {AES, enc} from 'crypto-js'
import { curve } from 'elliptic'

var EC = require('elliptic').ec
var ec = new EC('secp256k1')
const iv = enc.Hex.parse('1234567891011121314000000001')


function genkey()
{
  var key1 = ec.genKeyPair()
  var key2 = ec.genKeyPair()
  var shared1 = key1.derive(key2.getPublic())
  var shared2 = key2.derive(key1.getPublic())

  return {shared1, shared2}
}

function Encrypt(message, shared1)
{
  const encrypted = AES.encrypt(message,shared1,{iv:iv}).toString()
  return encrypted
}

function Decrypt(cipher, shared2)
{
  const decrypted = AES.decrypt(cipher,shared2,{iv:iv}).toString(enc.Latin1)
  const plaintexts = decodeURIComponent(decrypted);
  return plaintexts
}

export {genkey, Encrypt, Decrypt}