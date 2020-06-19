let ourP = document.querySelectorAll('p')
let form = document.forms.form_2;
const getS = selector => document.querySelector(selector);

let regExpFirst = /^[a-zA-Z]{2,20}$/;
let regExpSecond = /^[a-zA-Z]{2,20}$/;
let regExpThird = /^[\w\.\-]{1,}@\w{1,}\.\w{2,7}$/;
let regExpFourth = /^[a-zA-z0-9]{8,15}$/;
let allUser = []
let count = 0;

getS('#form_2_button').addEventListener('click', function () {
    let a = regExpFirst.test(form[0].value);
    let b = regExpSecond.test(form[1].value);
    let c = regExpThird.test(form[2].value);
    let d = regExpFourth.test(form[3].value);
    let test = [a, b, c, d];

    for (let i = 0; i < test.length; i++) {
        if (test[i] == false) {
            form[i].classList.add('false')
        }
        else {
            form[i].classList.remove('false')
        }
    }

    if (a && b && c && d) {
        createObject();
    }
})

function createObject() {
    let user = {
        firstName: form[0].value,
        lastName: form[1].value,
        email: form[2].value,
        password: form[3].value
    }

    if (allUser.length > 0) {
        for (let i = 0; i < allUser.length; i++) {
            if (allUser[i].email == user.email) {
                count++;
            }
        }

        if (count == 0) {
            allUser.push(user)
            localStorage.setItem(`${user.email}`, JSON.stringify(user))
            getS('.error_2').textContent = ''
            getS('.error_2').style.backgroundColor = 'rgb(248, 248, 248)'
            form.reset()
        }
        else {
            getS('.error_2').textContent = 'This email already exist'
            getS('.error_2').style.backgroundColor = 'red'
            count = 0;
        }
    }

    else {
        allUser.push(user)
        localStorage.setItem(`${user.email}`, JSON.stringify(user))
        form.reset()
    }
}

getS('#form_1_button').addEventListener('click', function () {
    if (localStorage.length == 0) {
        getS(".error_1").style.backgroundColor = 'red'
        getS(".error_1").textContent = 'Localstorage is empty'
    }

    else {
        if (localStorage.getItem(getS('#email').value)) {
            const fromStorage = localStorage.getItem(getS('#email').value);
            const { firstName, lastName, email, password } = JSON.parse(fromStorage)

            if (password == getS('#password').value) {
                ourP[4].textContent = firstName;
                ourP[5].textContent = lastName;
                ourP[6].textContent = email;
                getS('.sign_up').style.display = 'none';
                getS('.sign_in').style.display = 'none';
                getS('.final').style.display = 'flex';
            }
            else {
                getS(".error_1").style.backgroundColor = 'red'
                getS(".error_1").textContent = 'Incorrect email or password'
            }
        }

        else {
            getS(".error_1").style.backgroundColor = 'red'
            getS(".error_1").textContent = 'Incorrect email or password'
        }
    }
})

getS('.signOut').addEventListener('click', function () {
    getS('.sign_in').style.display = 'flex';
    getS('.final').style.display = 'none';
    getS(".error_1").style.backgroundColor = 'rgb(248, 248, 248)'
    getS(".error_1").textContent = ''
    document.forms.form_1.reset()
})
getS('.sign_in_now').addEventListener('click', function () {
    getS('.sign_up').style.display = 'none';
    getS('.sign_in').style.display = 'flex';

})
getS('.sign_up_now').addEventListener('click', function () {
    getS('.sign_in').style.display = 'none';
    getS('.sign_up').style.display = 'flex';
    getS(".error_1").style.backgroundColor = 'rgb(248, 248, 248)'
    getS(".error_1").textContent = ''
    document.forms.form_1.reset()
})

