---
title: "lessons in version control"
description: "aka, how to \"git gud\"."
pubDate: 2024-06-26T23:14:49.168Z
tags: ["programming"]
layout: "@/layouts/PostLayout.astro"
---

# hey!
if you're reading this, you likely want to know more about the wonderful tool that is the git version control system (referred to as just "git" from now on). that's great! i'm no expert myself, but i've definitely used it enough to know my way around the various pitfalls and confusions that beginners encounter all too often. without further ado, let's begin!

<sub>this guide paraphrases from the wonderful [Pro Git book, written by Scott Chacon and Ben Straub](//git-scm.com/book). give it a read!</sub>

## what is git?
git is a "distributed version control system" - it tracks versions of files, and was created by Linus Torvalds for use in the development of the Linux kernel. it implements a few core paradigms, which can be thought of as a tree. the tree's trunk is the "repository", which has branches stemming from it - exactly as in git, where "branches" are different contexts of the same repository. on the branches of a tree are leaves, which are "commits" in git. these describe the changes to files within the repository.

<br />

git can work entirely on your own computer, simply as a convenient way to organise data - it implements a full rewindable "commit history", so one could easily go back to a version of the repository from years ago, all while keeping the latest data intact. despite this, the real magic comes from "remotes", which are fairly self-explanatory. they store the files and associated git commits in a centralised place - "upstream", and are then synced to other "downstream" locations such as personal computers. some common examples are [GitHub](//github.com), [GitLab](//gitlab.com) or [Forgejo](//forgejo.org).

## basic tasks

### identity
before anything, git needs to know who you are. this simply requires a name (i use "marshift"), and an email. this is done via the `git config` command, like so:

```bash
git config --global user.name [name]
git config --global user.email [email]
```

in the above commands, we use the `--global` flag to make this setting apply across every git repository on the machine, rather than just the current one (if present).

### creating a repository
to turn a directory onto your computer into a git repository, simply:

```bash
git init
```

this creates the `.git` folder, which contains the repository metadata and internals. generally, you wont need to look inside and you'll especially never need to modify anything.

### committing changes
after creating your repository, it's a good idea to create an "initial commit", which documents the state of the files before any further work is done. if you don't have any files in there already, create your initial commit when you're happy with the first set of files you *do* have. this can be done with:

```bash
git add . # "Stage" every modified file
git commit -m "Initial commit" # Commit changes, with a message
```

in future, the above can be repeated, with a different message corresponding to your changes.

### syncing to a remote

#### uploading
once you've made changes locally, you may wish to sync them elsewhere. this is done like so:

```bash
git remote add origin [url-of-remote] # Add a remote named "origin"
git push -u origin [branch-name] # Push the local branch
```

the `-u` argument in the second command is shorthand for `--set-upstream`, which tells your local git instance that the equivalent remote branch is the specified name. after this is set, you may drop the extras and simply use `git push`.

#### downloading
in other cases, you may wish to take a repository stored remotely and place it onto your local machine. this, too, is trivial:

```bash
git clone [repository-url]
```

#### keeping up to date
if you have a repository cloned locally that has changed remotely, obtaining the latest changes is simple:

```bash
git pull
```

sometimes, though, the state of the remote repository and your local repository have diverged so much that they cannot be merged properly. these are known as [merge conflicts](#rewriting-history-and-merge-conflicts-or-affectionately-time-paradoxes).

### viewing history
occasionally, you may wish to view the prior commits in a repository, or to see what you've changed. the following can help:

```bash
git log # Scrollable history of commits
git status # State of current repository and changes
git diff # Actual differentials (i.e. added/removed) of files
```

## pitfalls <sub>or, "gitfalls"</sub>
all of this sounds great, but in practice, there are numerous factors of git which can be quite unfriendly to new users. some examples are:

### authorization and keys
it is worth noting that many git remotes require a further form of authorization, both for security reasons and as proof of identity. most commonly, this is done through SSH keys. these are difficult to explain, but, simply, they are a pair of public and private "keyfiles" that cryptographically ensure an identity for logging in to remote computers. personally, i suggest reading [this](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

### git vs github
time and time again, i have seen people confuse the version control system "git" with the code-hosting platform "GitHub". while yes, GitHub is a git remote, and you use the `git` commandline tool to interact with it, they are not the same thing, not at all.

### secret files
it is easy to accidentally commit something that should be kept private - be that a key file, password, or anything else. and, due to git's commit history, it is not trivial to redact this information once pushed to a remote. fortunately, rewriting history is achieveable easily - and far better information on that than i could ever write can be found [here](//git-scm.com/book/en/v2/Git-Tools-Rewriting-History) - however, you should read below first.

### rewriting history and merge conflicts <sub>or, affectionately, time paradoxes</sub>
as mentioned in Pro Git, you shouldn't push your work to a remote until you're happy with it. you have plenty of freedom to amend and rewrite history as much as you want within your local clone, but once that information is synced to a remote, it is preferable that history is only rewritten in emergencies. this avoids "merge conflicts", where the history of your local repository and the remote repository diverge. they are a real pain to fix, and if you find yourself in one, i wish you good luck.

## conclusion
aaaaannd that's about all. while yes, this guide does skip important details such as how to use branches, it does cover the basics. the rest is left as an exercise to the reader. if you've reached this point, i hope you've learned something new, and thank you for reading :>
