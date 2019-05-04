git checkout master
git add .
echo "enter commit message [ENTER]:"
read message
git commit -m "$message"
git push
