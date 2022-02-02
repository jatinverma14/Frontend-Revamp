import React, { useState, useEffect } from 'react'
import { login } from '../../actions/auth.actions'
import useWindowDimensions from '../../components/useWindowDimensions'
import { Router, Route, Link, useNavigate } from 'react-router-dom'
import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  Space,
  Button,
  Checkbox,
  Divider,
  message,
} from 'antd'
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
} from '@ant-design/icons'
import image from '../../assets/login/login.svg'
import * as styles from '../../assets/login/overrideStyles'

function Login(props) {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { Text, Link } = Typography
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [svg, setSvg] = useState(false)
  const { height, width } = useWindowDimensions()

  useEffect(() => {
    if (width < 1250) {
      setSvg(false)
    } else {
      setSvg(true)
    }
  }, [width])

  console.log(localStorage.getItem('err'))
  console.log(props)
  const {
    typeStyles,
    buttonStyles,
    inputStyles,
    formItemStyles,
    overrideStyles,
  } = styles

  const submitHandler = (e) => {
    if (username.length < 1 || password.length < 1) {
      alert('Fields should not remain blank')
      return
    }

    login(username, password).then((data) => {
      console.log(data)
      if (data.status === 'FAILED') {
        message.error('Failed to login!', 3, () => {
          alert(data.error)
        })
      } else {
        console.log(data.tokens)
        localStorage.setItem(
          'creds',
          JSON.stringify({
            access: data.tokens.access,
            refresh: data.tokens.refresh,
            first: data.first_time_login,
            username,
          })
        )
      }
      if (data.first_time_login === true) {
        // successfull first timer login
        message.success('Welcome to CodeDigger!', 1, () => {
          navigate('/updateProfile')
        })
      } else {
        // successful login and navigated to homepage
        message.success('Welcome to CodeDigger!', 1, () => {
          navigate('/home')
        })
      }
    })
  }

  return (
    <>
      <style>{overrideStyles}</style>
      <div>
        <Row style={{ ...typeStyles, minHeight: '100vh' }}>
          {svg && (
            <Col
              span={12}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={image}
                style={{ transform: 'translateX(15%)' }}
                alt="Login"
              />
            </Col>
          )}
          <Col
            span={svg ? 12 : 24}
            type="flex"
            // align="center"
            // justify="center"
            height="100vh"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Space direction="vertical" style={{ minWidth: '22vh' }}>
              <Row>
                <Space direction="vertical">
                  <Row>
                    <Text
                      style={{
                        ...typeStyles,
                        fontSize: '1rem',
                        fontWeight: 'light',
                        color: 'white',
                      }}
                      align=""
                    >
                      Welcome back
                    </Text>
                  </Row>
                  <Row>
                    <Text
                      style={{
                        ...typeStyles,
                        fontSize: '2rem',
                        lineHeight: '1rem',
                        fontWeight: '700',
                        paddingBottom: '1rem',
                        color: 'white',
                      }}
                    >
                      Login to your account
                    </Text>
                  </Row>
                  <Form layout={'vertical'} form={form} size="large">
                    <Form.Item
                      label={<label style={{ color: 'white' }}>Username</label>}
                      style={{
                        ...formItemStyles,
                        color: 'white',
                        marginBottom: '15px',
                        padding: '0px',
                        marginBottom: '5px',
                      }}
                    >
                      <Input
                        placeholder="Username"
                        style={{ backgroundColor: 'rbg(0,0,0,0.5)' }}
                        onChange={(e) => {
                          // console.log(e.target.value)
                          setUsername(e.target.value)
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label={<label style={{ color: 'white' }}>Password</label>}
                      labelCol={{ span: 24 }}
                      style={{ color: 'white' }}
                    >
                      <Input.Password
                        placeholder="Password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        style={{
                          ...inputStyles,
                          // background: 'rgb(0,0,0,0)',
                          color: '#fff',
                        }}
                        onChange={(e) => {
                          // console.log(e.target.value)
                          setPassword(e.target.value)
                        }}
                      />
                    </Form.Item>
                    <Row
                      justify="space-between"
                      style={{ paddingBottom: '1rem' }}
                    >
                      <Col span={12} align={'left'}>
                        <Checkbox
                          onChange={() => {
                            setRemember(!remember)
                            console.log(remember)
                          }}
                        >
                          <Text style={{ ...typeStyles, color: 'white' }}>
                            Remember Me
                          </Text>
                        </Checkbox>
                      </Col>
                      <Col span={12} align={'right'}>
                        <Link href="https://ant.design" target="_blank">
                          <Text style={{ ...typeStyles, color: 'white' }}>
                            Forgot Password?
                          </Text>
                        </Link>
                      </Col>
                    </Row>
                    <Form.Item style={{ ...formItemStyles }}>
                      <Button
                        type="primary"
                        style={{
                          ...buttonStyles,
                          width: '100%',
                          background: '#35AE9A',
                          border: 'none',
                        }}
                        onClick={submitHandler}
                        htmlType="submit"
                      >
                        Login Now
                      </Button>
                    </Form.Item>
                    <Form.Item style={{ ...formItemStyles }}>
                      <Button
                        type="primary"
                        style={{
                          ...buttonStyles,
                          width: '100%',
                          background: '#2D3748',
                          border: 'none',
                        }}
                      >
                        {' '}
                        <GoogleOutlined
                          align="center"
                          style={{ fontSize: '18px' }}
                        />
                        Or sign-in with google
                      </Button>
                    </Form.Item>
                  </Form>
                </Space>
              </Row>
              <Divider
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  letterSpacing: '0.1rem',
                  opacity: '0.5',
                  fontSize: '15px',
                }}
              >
                or
              </Divider>
              <Row style={{ width: '100%' }}>
                <Col style={{ width: '100%' }}>
                  <Space style={{ width: '100%', justifyContent: 'center' }}>
                    <Text
                      style={{ ...typeStyles, color: 'white', opacity: '0.8' }}
                    >
                      Don't have an account?{' '}
                      <Link
                        href="http://localhost:3000/register"
                        style={{ color: '#35AE9A' }}
                      >
                        Join free today
                      </Link>
                    </Text>
                  </Space>
                </Col>
              </Row>
            </Space>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Login
