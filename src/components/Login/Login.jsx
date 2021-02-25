import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import s from "./Login.module.css";
import PropTypes from 'prop-types';

const Login = ({setToken}) => {
    return (
        <div className={s.loginBack}>
            <div className={s.loginMidBack}>
                <div className={s.login}>
                    <h1>Simple Flight Check</h1>
                    <Formik
                        initialValues={{email: '', password: ''}}
                        validate={values => {
                            const beginWithoutDigit = /^\D.*$/
                            const withoutSpecialChars = /^[^-() /]*$/
                            const containsLetters = /^.*[a-zA-Z]+.*$/
                            const minimum8Chars = /^.{8,}$/
                            const withoutSpaces = /^[\S]$/

                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Поле должно быть заполнено!';
                            }
                            else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Неверный e-mail!';
                            }
                            if (!values.password) {
                                errors.password = "Поле должно быть заполнено!"
                            }
                            else if (beginWithoutDigit.test(values.password) &&
                                withoutSpecialChars.test(values.password) &&
                                containsLetters.test(values.password) && minimum8Chars.test(values.password)
                                && withoutSpaces.test(values.password)) {
                                errors.password = 'Неверный пароль!';
                            }
                            else if (values.password.length <8) {
                                errors.password = "Пароль должен быть не менее 8 символов!"
                            }
                            return errors;
                        }}
                        onSubmit={(values, {setSubmitting}) => {
                            let email = values.email;
                            setToken({"token": email});
                            setSubmitting(false);
                        }}
                    >
                        {({isSubmitting, errors, touched}) => (
                            <Form className={s.form}>
                                <div className={s.loginItem}>
                                    <span className={errors.email? s.errorHead : s.head}>Логин:</span>
                                    <Field type="email" name="email" className={errors.email? s.errorInput : s.inputForm}/>
                                    <ErrorMessage className={s.error} name="email" component="div"/>
                                </div>
                                <div className={s.loginItem}>
                                    <span className={(errors.password) ? s.errorHead : s.head}>Пароль:</span>
                                    <Field type="password" name="password" className={(errors.password) ? s.errorInput : s.inputForm}/>
                                    <ErrorMessage className={s.error} name="password"  component="div"/>
                                </div>
                                <button className={s.enter} type="submit" disabled={isSubmitting}>
                                    Войти
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}
export default Login;
Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
