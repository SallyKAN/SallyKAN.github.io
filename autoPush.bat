call git checkout master
call git add .
set /p message="enter commit message:"
call git commit -m "%message%"
call git push
pause