import React from 'react';

export default class User extends React.Component {
    constructor(login, email, password, done) {
        super();
        this.login = login;
        this.email = email;
        this.password = password;
        this.done = done;
    }
}