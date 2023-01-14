const lyric = `[00:00.50]Woah, woah, yeah
[00:02.90]Look at me dead in my eyes, I know that you know that a ***** ain't lyin'
[00:06.20]Too much respect, all of my shawty BDs, they know not to try it
[00:09.50]Too much respect, I used to hand out CDs before they would buy it
[00:12.90]Woah, she love me so much, it seem like she biased
[00:16.30]****** don't know how I live, but that's 'cause they live at the Hyatt, ayy
[00:19.70]4L step team steppin' on **** 'til it's quiet
[00:22.80]He brought me the money sealed up, I still had to count it, I cannot just eye it
[00:26.60]Woah, woah, woah
[00:29.10]Yeah, let's have ****in the bank, tеll 'em to open the safе
[00:33.00]I hate a privileged rapper who don't even know what it take


[00:36.30]The diamonds, they hit like a rainbow, that's 'cause the necklace a Frank (Purr)
[00:40.40]Woah, woah, woah
[00:42.70]Yeah, let's have ****in The Nines (Let's do it)
[00:45.00]Breakin' and bendin' her spine (Let's do it, let's do it)
[00:46.90]I hate a privileged rapper that ain't had a hit since he signed (Let's do it)
[00:49.40]****** be full of excuses, act like they takin' they time (For real, for real)
[00:53.30]Woah, woah, woah
[00:55.90]Look at me dead in my eyes, you see all the times that I had to go slide (21)
[00:59.70]Too many sticks, we go to war with whoever, ain't never been biased (*****)
[01:03.00]Too many sticks, how was they your opps and none of 'em died? (*****)
[01:06.20]Hol' up (21), hol' up (21), hol' up (21)
[01:08.60]Why you pull up at one in the morning and sit on the edge of the bed? (For what?)
[01:12.70]Textin' emojis, tongue out, eggplant, must've went over her head (21)
[01:16.10]Catch him outside of the studio (*****), make him repeat what he said (*****, *****)
[01:19.70]Yeah, yeah, let's have ****in the car (On God)
[01:22.90]The Maybach came with a bar (21)
[01:24.60]I'm wipin' my **** with her*****(21, pew, pew, pew)
[01:26.80]Sniped his ass, he got hit in the head from far (*****)
[01:29.70]Opps gets undivided attention, I give them my all (On God)
[01:33.00]How you come over to the spot when you know it's your time of the month? (How?)
[01:36.60]Make a diss and see how fast you go from the booth to a blunt (*****)
[01:39.40]She say she hungry, I gave her **** for brunch (On God)
[01:42.70]Send me my whole fee, I don't do backends and fronts (21)
[01:47.70]No, no, no
[01:50.00]Let's have ****in the bank, tell 'em to open the safe
[01:52.70]I hate a privileged rapper who don't even know what it take
[01:55.90]The diamonds, they hit like a rainbow, that's 'cause the necklace a Frank (Purr)
[02:00.10]Woah, woah, woah
[02:02.60]Yeah, let's have ****in The Nines (Let's do it)
[02:05.00]Breakin' and bendin' her spine (Let's do it, let's do it)
[02:06.90]I hate a privileged rapper that ain't had a hit since he signed (Let's do it)
[02:09.40]****** be full of excuses, act like they takin' they time (For real, for real)`;

console.log(
  lyric.split("\n").map((line) => {
    return {
      time: line.substring(1, 9),
      line: line.substring(10),
    };
  })
);
