# LX

LX (`'alex'`) is a declarative, functional open source lighting console. This is the aforementioned open source. It is being written in response to my always thinking that "it can't be that hard to make this easily", so I'm trying to prove myself wrong (probably.)

It's also going to be thing that makes me learn how to TypeScript. So we'll see how that goes. 

Here are some of the things it needs to do. 

### Functionality Pile

- LIVE: have a 'live' state of CHANNELS with values. 
- set levels of individual 'CHANNELS' on 'CUES', from 1 - 100 (%).
- RECORD: record the LIVE state into the CHANNEL values of a CUE
- command propt to issue editing and RECORD commands. 
- set a FADE TIME on those cues. 
- execute a 'GO' on the cue stack, transitioning the active channels smoothly from their 'cold' (old) value to their 'hot' (new) value. 
- GO-TO-CUE...: FADE the live state smoothly to the values of a specified CUE 
- convert the channel levels to mapped addresses, levels from 0 - 255
- translate the addresses to dmxAddresses and send them out. 
- split CUE timing: different UP and DOWN times on CUES. 
- default programming modes: CUE ONLY / TRACKING (with a TRACK / CUE ONLY flag on the command prompt)

## Project Timeline / Structure

### MVP (v0.1)
