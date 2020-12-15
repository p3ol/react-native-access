import { Buffer } from 'buffer';

import { encode, decode } from 'base-64';

global.process.version = 'v12';
global.Buffer = Buffer;

global.btoa = encode;
global.atob = decode;
