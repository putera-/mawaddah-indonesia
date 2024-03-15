# GIT CHEAT SHEET

## BRANCH

```sh
# List Branch
git branch

# Create New Branch
git branch [nama_branch]

# Create New Branch + Checkout
git checkout -b [nama_branch]

# Swith branch
git checkout [nama_branch]

# Rebase to master
git rebase master

# abort rebase if conflict
git rebase --abort
```

### REMOTE

```sh
# Check Remote Name
git remote -v
```

### PUSH

```sh
# push
git push

# git push branch
git push [nama_remote] [nama_branch]

# git pull branch
git pull [nama_remote] [nama_branch]
```
