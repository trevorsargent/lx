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
- GO TO CUE...: FADE the live state smoothly to the values of a specified CUE 
- convert the channel levels to mapped addresses, levels from 0 - 255
- translate the addresses to dmxAddresses and send them out. 
- split CUE timing: different UP and DOWN times on CUES. 
- default programming modes: CUE ONLY / TRACKING (with a TRACK / CUE ONLY flag on the command prompt)
- relative and absolute effects. 
- captured channels

## Structure

a stream of changes. 
start value, end value, length, and time it started. those are applied to the current cue until all of them are completed. 
the function that figured out what value a channel should be at only has to look at those change objects. 
captured channels override all of it. 

when a cue is told to GO, all of the active channels in the cue are added to the stream of changes with the fade time, start time, and end time, taking it's start value from the live state. each change object replaces any change element with the same channel number. 

all the calculation should be done from 0 - 255 for forward compatibily of instrument properties that are 16bit. intensity values should be mapped to 16bit before being saved in the cue, and the live display table should just map them to 0 - 100 before display. 

channels are just streams -> [this seems useful](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

is there a "get most recently emited value" on streams?

ChannelDelta: Struct  
- is created by:
	- GOs 
	- GO TO CUEs
	- BACKs
- has:  
	-	the channel number
	- the target value
	- the curve information 
	- and the time to animate 

Channel: Stream
- subscribes to the Active Cues. 
- receives: channel values from input and cues. 
- emits: a ChannelDelta every time the channel is told to change. 

ChannelDeltaAgrigate: Stream
- a constant stream of every ChannelDelta (for all channels)
- merged from all the 'Channel' streams

ChannelAnimationGenerator: MetaStream 
- maps each ChannelDelta from the ChannelDeltaAgrigate to a new ChannelAnimator stream.  

ChannelAnimator: Stream
- recieves:
	- the start value (from the current live value of the channel) 
	- the target value, and the time to transition.
- emits the current calculated level every 10ms

ChangesStream: 


#### Current Cue
the static

## Project Timeline

### MVP (v0.1)

- LIVE state.
- edit live state, and record changes into cues
- GO, and GO TO CUE
- dmx output

