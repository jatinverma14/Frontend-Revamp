import React, { useState, useEffect } from 'react'
import { register } from '../../actions/auth.actions'
import useWindowDimensions from '../../components/useWindowDimensions'
import { Row, Col, Typography, Form, Input, Space, Button, Divider } from 'antd'
// import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';
import image from '../../assets/signup/register.svg'
import * as styles from '../../assets/signup/overrideStyles.js'

function Register(props) {
  const [form] = Form.useForm()
  const { Text, Link } = Typography
  const [svg, setSvg] = useState(false)
  const [mail, setMail] = useState('')
  const [username, setName] = useState('')
  const [password, setPass] = useState('')
  const { height, width } = useWindowDimensions()

  useEffect(() => {
    if (width < 1250) {
      setSvg(false)
    } else {
      setSvg(true)
    }
  }, [width])
  console.log(props)

  const {
    typeStyles,
    buttonStyles,
    inputStyles,
    formItemStyles,
    overrideStyles,
  } = styles
  const submitHandler = (e) => {
    e.preventDefault()
    if (password.length < 1 || username.length < 1 || mail.length < 1) {
      alert('Fields should not remain blank')
      return
    }
    register(mail, username, password).then((data) => {
      console.log(data)
      if (data.status === 'FAILED') {
        alert(data.error)
      } else {
        console.log(data.result)
      }
      // successful login and navigated to homepage
      // navigate("/home")
      window.location = '/login'
    })
  }

  return (
    <>
      <style>{overrideStyles}</style>
      <div>
        <Row style={{ ...typeStyles, minHeight: '90vh' }}>
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
                style={{ transform: 'translateX(15%) scale(0.9)' }}
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
              minWidth: '22vw',
            }}
          >
            <Space direction="vertical">
              <Row>
                <Space direction="vertical">
                  <Row>
                    <Text
                      style={{
                        ...typeStyles,
                        fontSize: '1rem',
                        fontWeight: 'light',
                        letterSpacing: '0.01rem',
                      }}
                      align=""
                    >
                      Welcome, coder
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
                      }}
                    >
                      Register for your account
                    </Text>
                  </Row>
                  <Form layout={'vertical'} form={form} size="large">
                    <Form.Item
                      label={
                        <label style={{ color: 'white' }}>Email Address</label>
                      }
                      style={{
                        ...formItemStyles,
                        color: 'white',
                        marginBottom: '15px',
                        padding: '0px',
                      }}
                    >
                      <Input
                        placeholder="Email Address"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        style={{ ...inputStyles, color: '#fff' }}
                      />
                    </Form.Item>
                    <Form.Item
                      label={<label style={{ color: 'white' }}>Username</label>}
                      style={{
                        ...formItemStyles,
                        color: 'white',
                        marginBottom: '15px',
                        padding: '0px',
                      }}
                    >
                      <Input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        style={{ ...inputStyles, color: '#fff' }}
                      />
                    </Form.Item>

                    <Form.Item
                      label={<label style={{ color: 'white' }}>Password</label>}
                      labelCol={{ span: 24 }}
                    >
                      <Input.Password
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPass(e.target.value)}
                        style={{ ...inputStyles, color: '#fff' }}
                      />
                    </Form.Item>
                    {/* <Row justify="space-between" style={{ paddingBottom:"1rem"}}>
                                            <Col span={12} align={'left'}>
                                                <Radio>
                                                    <Text style={{ ...typeStyles, }}>
                                                        Remember Me
                                                    </Text>
                                                </Radio>
                                            </Col>
                                            <Col span={12} align={'right'}>
                                                <Link href="https://ant.design" target="_blank">
                                                    <Text style={{ ...typeStyles}}>
                                                        Forgot Password?
                                                    </Text>
                                                </Link>
                                            </Col>
                                        </Row> */}
                    <Form.Item style={{ ...formItemStyles }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          ...buttonStyles,
                          background: '#35AE9A',
                          fontWeight: '700',
                          letterSpacing: '0.05rem',
                        }}
                        onClick={submitHandler}
                      >
                        Register Now
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
                    <Text style={{ ...typeStyles, opacity: '0.8' }}>
                      Already have an account..?{' '}
                      <Link
                        href="http://localhost:3000/login"
                        style={{ color: '#35AE9A' }}
                      >
                        Login to your account
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

export default Register
