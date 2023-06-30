import classNames from 'classnames/bind';
import { useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import icons from "../ultis/icons";
import path from '../ultis/path';
import * as actions from "../store/action";
import './Form.css';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const { AiOutlineClose, AiOutlineEyeInvisible, AiOutlineEye, AiOutlineLoading3Quarters } = icons

function Form() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const btnEnterRef = useRef();
    const [userInput, setUserInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [mess, setMess] = useState('');
    const [show, setShow] = useState(false);
    const [toggleEye1, setToggleEye1] = useState(false);
    const [toggleEye2, setToggleEye2] = useState(false);
    const [toggleEye3, setToggleEye3] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoginForm, setIsLogin] = useState(true);
    const [validMsgError, setValidMsgError] = useState({});
    const { currentWidth } = useSelector(state => state.app);
    const { users, userNow } = useSelector(state => state.music);



    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [mess]);


    //loadingForm
    const [isLoadingForm, setLoadingForm] = useState(false);

    const onChangeForm = () => {
        setIsLogin(!isLoginForm);
        setValidMsgError(false);
        setUserInput('');
        setEmailInput('');
        setPasswordInput('');
        setPasswordConfirm('');
    };
    const handleCloseForm = () => {
        // setIsLogin(false);
        navigate(path.PUBLIC)
    };

    const onTypeUser = (e) => {
        setUserInput(e.target.value);
        if (e.target.value) {
            setValidMsgError((prev) => {
                return { ...prev, user: '' };
            });
        }
    };
    const onTypePassWord = (e) => {
        setPasswordInput(e.target.value);

        if (e.target.value) {
            setValidMsgError((prev) => {
                return { ...prev, password: '' };
            });
        }
    };
    const onTypePassWordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
        if (e.target.value) {
            setValidMsgError((prev) => {
                return { ...prev, passwordConfirm: '' };
            });
        }
    };
    const onTypeEmail = (e) => {
        setEmailInput(e.target.value);
        if (e.target.value) {
            setValidMsgError((prev) => {
                return { ...prev, email: '' };
            });
        }
    };

    const validator = () => {
        const msg = {};

        if (isLoginForm) {
            if (!emailInput) {
                msg.emailInput = 'Vui lòng nhập email';
            } else {
                const regexEmail = new RegExp(
                    '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
                );
                if (!regexEmail.test(emailInput)) msg.emailInput = 'Vui Lòng Nhập Đúng Email';
            }
            if (!passwordInput) {
                msg.passwordInput = 'Vui lòng nhập mật khẩu';
            } else {
                const regexPassword = new RegExp('^[a-zA-Z0-9]{8,}$');
                if (!regexPassword.test(passwordInput))
                    msg.passwordInput = 'Mật khẩu phải chứa đủ 8 kí tự';
            }
        } else {
            if (!passwordInput) {
                msg.passwordInput = 'Vui lòng nhập mật khẩu';
            }
            // else {
            //     const regexPassword = new RegExp('^[a-zA-Z0-9]{8,}$');
            //     if (!regexPassword.test(passwordInput))
            //         msg.passwordInput = 'Mật khẩu phải chứa đủ 8 kí tự';
            // }

            if (!passwordConfirm) {
                msg.passwordConfirm = 'Vui lòng xác nhận mật khẩu';
            } else {
                if (passwordConfirm !== passwordInput) {
                    msg.passwordConfirm = 'Mật khẩu không chính xác';
                }
            }

            if (!userInput?.trim()) {
                msg.userInput = 'Vui lòng nhập username';
            }
            // else {
            //     const regexUser = new RegExp('^[a-z0-9_-]{8,20}$');
            //     if (!regexUser.test(userInput)) msg.userInput = 'Username phải từ 8 - 20 kí tự';
            // }

            if (!emailInput) {
                msg.emailInput = 'Vui lòng nhập email';
            } else {
                const regexEmail = new RegExp(
                    '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
                );
                if (!regexEmail.test(emailInput)) msg.emailInput = 'Vui Lòng Nhập Đúng Email';
            }
        }

        setValidMsgError(msg);
        if (Object.keys(msg).length > 0) return false;

        if (isLoginForm) return true;
        return true;
    };

    // Kiểm tra xem username hoặc email đã đăng ký chưa
    const existing = users.find(user => user?.username === userInput && user.password === passwordInput);
    const existingUser = users.find(user => user?.username === userInput);
    const existingEmail = users.find(item => item?.email === emailInput);

    const avatar = "https://hinhnen123.com/wp-content/uploads/2021/06/avt-cap-doi-5.jpg"
    // Đăng ký
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validator();
        if (!isValid) {
            return
        }
        const levelA = userInput == "admin" ? "1" : "4"
        const newUser = {
            "username": userInput,
            "password": passwordInput,
            "email": emailInput,
            "level": levelA,
            "avatarURL": avatar
        }
        if (existingEmail) {
            setMess("Email này đã đăng ký tài khoản! Vui lòng chọn email khác")
            setIsSuccess(false)
            return
        }
        if (existingUser) {
            setMess("Tên đăng nhập đã tồn tại! Vui lòng chọn tên khác")
            setIsSuccess(false)
            return
        } else {
            dispatch(actions.setUsers(newUser))
            // setTimeout(() => {
            //     setMess("Đăng ký thành công!")
            //     setIsSuccess(true)
            // }, 1000);
            setIsLogin(true)
        }

    };
    // Đăng nhập
    const handleLogin = (e) => {
        e.preventDefault();
        const isValid = validator();
        const levelUserNow = users?.find(user => user.username == userInput)?.level
        if (!userInput || !passwordInput) {
            setMess("Hãy điền đầy đủ thông tin")
            setIsSuccess(false)
            return;
        }
        if (levelUserNow == 5) {
            setMess("Tài khoản đã bị khoá. Đề nghị liên hệ quản trị viên")
            setIsSuccess(false)
            return
        };
        if (existing) {
            dispatch(actions.setUserNow(userInput))
            setMess("Đăng nhập thành công");
            setIsSuccess(true)
            navigate(path.PUBLIC)
        } else {
            setMess("Tên đăng nhập hoặc mật khẩu không đúng. Hãy thử lại")
            setIsSuccess(false)
            return
        }



    };

    useEffect(() => {
        //enter to submit form
        const handlePressKeyEnter = (e) => {
            if (e.key === 'Enter') {
                btnEnterRef.current.click();
            }
        };
        window.addEventListener('keypress', handlePressKeyEnter);

        return () => window.removeEventListener('keypress', handlePressKeyEnter);
    }, []);
    console.log(toggleEye1);
    const typeInput1 = toggleEye1 ? "text" : "password"
    const typeInput2 = toggleEye2 ? "text" : "password"
    const typeInput3 = toggleEye3 ? "text" : "password"
    return (
        <div className='flex fixed top-0 left-0 z-50 right-0 bottom-0 justify-center items-center bg-[hsla(0, 0, 0, 0.6)]'>
            <div className='flex flex-col bg-[#130c1c] p-5 rounded-sm w-[50vw] relative'>
                <h3 className='text-2xl font-semibold m-auto'>
                    {isLoginForm ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}
                    <span className='absolute right-1 top-1'
                        onClick={handleCloseForm}
                    >
                        <AiOutlineClose />
                    </span>
                </h3>
                <form
                    className=''
                    onSubmit={(e) => (isLoginForm ? handleLogin(e) : handleSubmit(e))}
                >
                    {isLoginForm ? (
                        ///////////////
                        /* Form Login */
                        ///////////////
                        <div className=''>
                            <div className='flex flex-col pb-[10px]'>
                                <div className='flex items-center w-full'>
                                    <label className='text-md font-semibold w-1/5' htmlFor="email">
                                        Username
                                    </label>
                                    <input
                                        className={`outline-none rounded-sm text-sm py-[10px]
                                        px-[5px] w-4/5 mt-[10px] mr-[5px] bg-[#34224f]`}
                                        value={userInput}
                                        placeholder="Nhập username..."
                                        type="text"
                                        id="userName"
                                        onChange={onTypeUser}
                                    />
                                </div>
                                {/* <span className='text-red-400 text-md'>
                                    {validMsgError.emailInput}{' '}
                                </span> */}
                            </div>

                            <div className='flex flex-col pb-[10px]'>
                                <div className=' relative flex items-center w-full'>
                                    <label className='text-md font-semibold w-1/5' htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        type={typeInput3}
                                        id="password"
                                        placeholder="Mật khẩu..."
                                        className={`${validMsgError.passwordInput ? 'border border-red-400' : ''} 
                                    outline-none rounded-sm text-sm py-[10px] px-[5px] w-4/5 mt-[10px] mr-[5px] bg-[#34224f]`}
                                        value={passwordInput}
                                        onChange={onTypePassWord}
                                    />
                                </div>
                                {toggleEye3
                                    ? <span onClick={() => { setToggleEye3(pre => !pre) }} className='absolute right-10 top-[132px]'><AiOutlineEye size={20} /></span>
                                    : <span onClick={() => { setToggleEye3(pre => !pre) }} className='absolute right-10 top-[132px]'><AiOutlineEyeInvisible size={20} /></span>}
                                {/* <span className='text-red-400 text-md'>
                                    {validMsgError.passwordInput}{' '}
                                </span> */}
                            </div>
                        </div>
                    ) : (
                        //////////////////
                        /* Form Register */
                        //////////////////
                        <div className=''>
                            <div className='flex flex-col pb-[10px]'>
                                <div className='flex items-center w-full'>
                                    <label className='text-md w-[30%] font-semibold' htmlFor="userName">
                                        User
                                    </label>
                                    <input
                                        type="text"
                                        id="userName"
                                        placeholder="Tên đăng nhập"
                                        className={`${validMsgError.userInput ? 'border border-red-400' : ''} 
                                    outline-none rounded-sm text-sm py-[10px] px-[5px] w-[70%] mt-[10px] mr-[5px] bg-[#34224f]`}
                                        value={userInput}
                                        onChange={onTypeUser}
                                    />
                                </div>

                                <span className='text-red-400 text-md clear-both'>
                                    {validMsgError.userInput}{' '}
                                </span>
                            </div>

                            <div className='flex flex-col pb-[10px]'>
                                <div className='flex items-center w-full'>
                                    <label className='text-md w-[30%] font-semibold' htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className={`${validMsgError.emailInput ? 'border border-red-400' : ''} 
                                    outline-none rounded-sm text-sm py-[10px] px-[5px] w-[70%] mt-[10px] mr-[5px] bg-[#34224f]`}
                                        value={emailInput}
                                        placeholder="Nhập email..."
                                        type="email"
                                        id="email"
                                        onChange={onTypeEmail}
                                    />
                                </div>
                                <span className='text-red-400 text-md'>
                                    {validMsgError.emailInput}
                                </span>
                            </div>

                            <div className='flex flex-col pb-[10px]'>
                                <div className='relative flex items-center w-full'>
                                    <label className='text-md w-[30%] font-semibold' htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        type={typeInput1}
                                        id="password"
                                        placeholder="Mật khẩu..."
                                        className={`${validMsgError.passwordInput ? 'border border-red-400' : ''} 
                                    outline-none rounded-sm text-sm py-[10px] px-[5px] w-[70%] mt-[10px] mr-[5px] bg-[#34224f]`}
                                        value={passwordInput}
                                        onChange={onTypePassWord}
                                    />
                                </div>
                                {toggleEye1
                                    ? <span onClick={() => { setToggleEye1(pre => !pre) }} className='absolute right-10 top-[190px]'><AiOutlineEye size={20} /></span>
                                    : <span onClick={() => { setToggleEye1(pre => !pre) }} className='absolute right-10 top-[190px]'><AiOutlineEyeInvisible size={20} /></span>}

                                <span className='text-red-400 text-md'>
                                    {validMsgError.passwordInput}
                                </span>
                            </div>

                            <div className='flex flex-col pb-[10px]'>
                                <div className='flex items-center w-full'>
                                    <label
                                        className='text-md w-[30%] font-semibold'
                                        htmlFor="password_confirm"
                                    >
                                        Password Confirm
                                    </label>
                                    <input
                                        type={typeInput2}
                                        id="password_confirm"
                                        placeholder="Xác nhận mật khẩu"
                                        className={`${validMsgError.passwordConfirm ? 'border border-red-400' : ''} 
                                    outline-none rounded-sm text-sm py-[10px] px-[5px] w-[70%] mt-[10px] mr-[5px] bg-[#34224f]`}
                                        value={passwordConfirm}
                                        onChange={onTypePassWordConfirm}
                                    />
                                </div>
                                {toggleEye2
                                    ? <span onClick={() => { setToggleEye2(pre => !pre) }} className='absolute right-10 top-[250px]'><AiOutlineEye size={20} /></span>
                                    : <span onClick={() => { setToggleEye2(pre => !pre) }} className='absolute right-10 top-[250px]'><AiOutlineEyeInvisible size={20} /></span>}
                                <span className='text-red-400 text-md'>
                                    {validMsgError.passwordConfirm}
                                </span>
                            </div>

                        </div>
                    )}

                    <div className='items-center p-[10px]'>
                        <span className='text-md font-medium mr-[10px]'>
                            {isLoginForm
                                ? 'Bạn không có tài khoản ?'
                                : 'Bạn đã có tài khoản ?'}
                        </span>
                        <span
                            className='text-md font-semibold cursor-pointer hover:underline hover:text-[#9b4de0]'
                            onClick={onChangeForm}
                        >
                            {isLoginForm ? 'Đăng Kí' : 'Đăng Nhập'}
                        </span>
                    </div>

                    <button
                        type="submit"
                        ref={btnEnterRef}
                        className={`${isLoadingForm ? 'isLoading' : ''} items-center p-[10px]`}
                    >
                        {/* <span className=''>
                            {isLoadingForm && <AiOutlineLoading3Quarters />}
                        </span> */}
                        <div className='w-full m-auto flex flex-col'>
                            <span className={`${isSuccess ? 'text-[#9B4DE0]' : 'text-red-500'} font-semibold`}>{mess}</span>

                            <span className='bg-[#9b4de0] font-semibold py-2 px-4 rounded-l-full rounded-r-full text-lg m-auto'>
                                {isLoginForm ? 'Đăng nhập' : 'Đăng kí'}
                            </span>
                        </div>
                    </button>
                </form>
            </div>

        </div>
    );
}

export default Form;
