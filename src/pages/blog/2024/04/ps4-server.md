---
title: "using a playstation 4 as a server"
description: "horrible idea? maybe! funny? absolutely!"
pubDate: 2024-04-22T23:16:51.933Z
tags: ["sysadmin", "fun"]
layout: "@/layouts/PostLayout.astro"
---

# why?
a while ago, i purchased the domain [on-a-ps4.lol](//on-a-ps4.lol). it has, up until now, never been used.
however, as of recent i have wanted to host various services on reasonable hardware, and what better excuse to do something funny like this - so let's change that!

## requirements
* jailbreakable playstation 4 (firmware 9.00 preferred)
    - **this guide will differ based on your ps4's southbridge!**
    - i have the belize model
* usb flash drive/ssd, 12GB or larger, formatted as FAT32
    - i am using a 1TB My Passport Ultra
    - if your drive is too large to format as FAT32 on windows, you can use [this tool](//www.majorgeeks.com/mg/getmirror/fat32format,1.html)
* usb keyboard
* ethernet (you could also set up wifi, but this is an exercise for the reader)
* some understanding of ps4 modding
* some understanding of linux

## picking a distro
funny story here - this guide was actually rewritten *twice*! initially, i picked rocky linux, but didn't enjoy RPM packaging. i then tried debian, which would not init properly after a reboot - and i have no idea why!
after some consideration, i chose alpine linux.

## packaging alpine for the playstation
there are decent (albeit ad-riddled) guides on how to do plenty of neat things on [ps4linux.com](//ps4linux.com), including [how to port your own distro](//ps4linux.com/make-ps4-linux-distro), so i started there.

here are my own alpine-specific instructions:

### setup
* download the *"Standard"* ISO for `x86_64` from [the alpine linux website](//www.alpinelinux.org/downloads)
* install and setup Oracle VM VirtualBox, and the VirtualBox Extension Pack
* add your VM:
    - select the alpine ISO you downloaded
    - make the type *"Linux"* and the version *"Other Linux (64-bit)"*
    - give it 4-8GB RAM, and ensure the virtual disk image is in VDI or VHD format
    - you should only need around 2GB of storage on the virtual disk, but make sure you tick *"Pre-allocate Full Size"*
* power the VM on
* you should be met with a login prompt
* log in as `root` - it has no password
* run `setup-alpine`, and follow the setup as normal
* when you reach the disk options, choose `none` - we're not installing here
* in the same regard, choose `none` for config location
* pick the default `apk` cache location (`/var/cache/apk`)
* proceed to [the next section](#packaging)

### packaging
to put the distro on the ps4, we need to create a tarball of the filesystem:
* we need the xz utils first, so `apk add xz` ([controversial, i know](//boehs.org/node/everything-i-know-about-the-xz-backdoor))
* then, run this command to create a tarball of your handcrafted alpine install:
```
tar --exclude=ps4alpine.tar.xz --exclude=.modloop --exclude=media/cdrom/* --exclude=var/cache --exclude=run --exclude=proc --exclude=dev --exclude=sys -cvJpf ps4alpine.tar.xz /
```
* this *may* take some time, so sit back, put on some [good music](//open.spotify.com/album/0KdbNiljxzEMCwkVJS0wzI), and watch the magic happen.
* once done, we need to copy our file to the virtual disk we made earlier in order to extract it from the VM
* create a partition with `fdisk`:
    - `fdisk /dev/sda`
    - then, like a video game cheat code, type `n`, `enter`, `p`, `enter`, `1`, `enter`, `enter`, `enter`, `w`, `enter`
* then, format it as fat32 with `mkfs.vfat -F 32 /dev/sda1`
* now, move our tarball to it:
```
mount -t vfat /dev/sda1 /mnt
mv ps4alpine.tar.xz /mnt
```
* then, power off the VM and proceed to [the next section](#installing-alpine-on-the-playstation)

## installing alpine on the playstation
ps4linux.com suggests a "new method" for installing distributions on the playstation these days - involving extracting the archive
yourself with a tool such as Rufus or Balena Etcher. unfortunately, i could not figure out how to package my own distro to support this,
so for now, let's use the "old method":

* launch your ps4 exploit host of choice, jailbreak, and deploy GoldHEN
    - i am using [kameleon's 9.00 host](//www.kmeps4.site/psfree900m/index.html)
* download or compile a kernel image (`bzImage`) for your ps4's southbridge
    - i am using the [5.15.15 belize kernel with /dev/net/tun support by noob404](//mega.nz/file/Y7x1QAzC#jMMlZpWERCqKrI9C06kPg5A7vsERF055XEeg32BLdU0)
* download an initramfs image
    - i am using [noob404's initramfs](//mega.nz/file/HqowkYRA#bruMlaJ18B0HfFUL7BfWPPJ3pubqD78FcY1XFy29c-k)
* using something like 7zip, open your VM's `.vdi` file:
    - grab the `ps4alpine.tar.xz` tarball created earlier
    - rename this to `psxitarch.tar.xz`
* place all of these files onto the root of your usb drive, and connect it to your ps4
* deploy the 1GB VRAM linux payload from your exploit host
* the playstation should reboot after a short while
* if all is well, you will be dropped into `rescueshell`
* connect a keyboard
* run `exec install-psxitarch.sh`
* the ps4 should begin extracting the alpine distro you packaged earlier
* once it is done, it *should* go straight to the login screen
    - despite this, it did not for me, so i just ran `resume-boot`
* proceed to [the next section](#post-installation)

## post-installation
congratulations! your ps4 is now, technically, an alpine server, and it should be accessible over SSH.

however, we still have some cleanup to do, so login:

### recommended
* install `nano`
* edit `/etc/apk/repositories` and remove `/media/cdrom/apks`
* edit `/etc/motd` to remove the pre-setup one
    - i pasted some [nice ascii text](//patorjk.com/software/taag) in here
* configure `doas` to `permit persist :wheel`
* add your user to the `wheel` group
* configure your ssh key in `~/.ssh/authorized_keys`
* install `bash` and [change your shell](//wiki.alpinelinux.org/wiki/Change_default_shell) to it
    - you may wish to configure bash - i pulled the files from my debian vps

### optional
* install `pfetch` from [source](//raw.githubusercontent.com/dylanaraps/pfetch/master/pfetch)
* install `git`
* install `tmux`
* disable ssh root & password access

## what next?
once i had the ps4 server up and running, i ran numerous tests to ensure it would hold up under load - which it did. i moved it to a better location, added it to my [tailnet](//tailscale.com), and set up `nginx` as well as `frp` for the sake of protecting my ip address via reverse proxy.

<br />

overall, this experiment was a success - and as of now, the playstation runs an [akkoma](//akkoma.social) instance at [fedi.on-a-ps4.lol](//fedi.on-a-ps4.lol) and an [srb2](//srb2.org) server at srb2.on-a-ps4.lol.

<br />

thank you for reading.
