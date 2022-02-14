import React, { useState } from 'react'
import { Row, Col, Typography, Form, Input, Space, Button } from 'antd'
import * as styles from '../../assets/updateProfile/overrideStyles'
import { auth_profile_update } from '../../actions/auth.actions'
import image from '../../assets/updateProfile/update.svg'

function UpdateProfile(props) {
  const [form] = Form.useForm()
  const [name, setName] = useState('')
  const [codechef, setCodechef] = useState('')
  const [codeforces, setCodeforces] = useState('')
  const [atcoder, setAtcoder] = useState('')
  const [spoj, setSpoj] = useState('')
  const [uva, setUva] = useState('')
  const { Text, Link } = Typography
  // console.log(props)

  const {
    typeStyles,
    buttonStyles,
    inputStyles,
    formItemStyles,
    overrideStyles,
  } = styles
  function handleClick(name, codechef, codeforces, atcoder, spoj, uva_handle) {
    auth_profile_update(name, codechef, codeforces, atcoder, spoj, uva_handle)
      .then((res) => res.json)
      .then((data) => {
        console.log(data)
        window.location = '/profile'
      })
  }

  return (
    <>
      <style>{overrideStyles}</style>
      <div>
        <Row style={{ ...typeStyles, minHeight: '90vh' }}>
          <Col
            span={12}
            type="flex"
            height="100vh"
            minwidth="32vw"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Space>
              <Row>
                <Space direction="vertical">
                  <Row>
                    <Text
                      style={{
                        ...typeStyles,
                        fontSize: '1rem',
                        fontWeight: 'light',
                      }}
                      align=""
                    >
                      Profile Update
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
                      Enter your competitive handles
                    </Text>
                  </Row>
                  <Form
                    // layout={'vertical'}
                    form={form}
                    size="large"
                  >
                    <Form.Item
                      rules={[{ required: true }]}
                      label={<label style={{ color: 'white' }}>Name:</label>}
                      style={{
                        ...formItemStyles,
                        color: 'white',
                        marginBottom: '15px',
                        padding: '0px',
                      }}
                    >
                      <Input
                        placeholder="Username Handle"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ ...inputStyles, color: '#fff' }}
                      />
                    </Form.Item>
                    <Form.Item
                      rules={[{ required: true }]}
                      label={
                        <label style={{ color: 'white' }}>
                          Codeforces Handle:
                        </label>
                      }
                      style={{
                        ...formItemStyles,
                        color: 'white',
                        marginBottom: '15px',
                        padding: '0px',
                      }}
                    >
                      <Input
                        placeholder="Codeforces Handle"
                        value={codeforces}
                        onChange={(e) => setCodeforces(e.target.value)}
                        style={{ ...inputStyles, color: '#fff' }}
                      />
                    </Form.Item>
                    <Form.Item
                      rules={[{ required: true }]}
                      label={
                        <label style={{ color: 'white' }}>
                          Codechef Handle:
                        </label>
                      }
                      style={{
                        ...formItemStyles,
                        color: 'white',
                        marginBottom: '15px',
                        padding: '0px',
                      }}
                    >
                      <Input
                        placeholder="Codechef Handle"
                        value={codechef}
                        onChange={(e) => setCodechef(e.target.value)}
                        style={{ ...inputStyles, color: '#fff' }}
                      />
                    </Form.Item>
                    <Form.Item
                      rules={[{ required: true }]}
                      label={
                        <label style={{ color: 'white' }}>
                          Atcoder Handle:
                        </label>
                      }
                      style={{
                        ...formItemStyles,
                        color: 'white',
                        marginBottom: '15px',
                        padding: '0px',
                      }}
                    >
                      <Input
                        placeholder="Atcoder Handle"
                        value={atcoder}
                        onChange={(e) => setAtcoder(e.target.value)}
                        style={{ ...inputStyles, color: '#fff' }}
                      />
                    </Form.Item>
                    <Form.Item
                      rules={[{ required: true }]}
                      label={
                        <label style={{ color: 'white' }}>SPOJ Handle:</label>
                      }
                      style={{
                        ...formItemStyles,
                        color: 'white',
                        marginBottom: '15px',
                        padding: '0px',
                      }}
                    >
                      <Input
                        placeholder="SPOJ Handle"
                        value={spoj}
                        onChange={(e) => setSpoj(e.target.value)}
                        style={{ ...inputStyles, color: '#fff' }}
                      />
                    </Form.Item>
                    <Form.Item
                      rules={[{ required: true }]}
                      label={
                        <label style={{ color: 'white' }}>UVA Handle:</label>
                      }
                      style={{
                        ...formItemStyles,
                        color: 'white',
                        marginBottom: '15px',
                        padding: '0px',
                      }}
                    >
                      <Input
                        placeholder="UVA Handle"
                        value={uva}
                        onChange={(e) => setUva(e.target.value)}
                        style={{ ...inputStyles, color: '#fff' }}
                      />
                    </Form.Item>
                    <Row gutter={32} style={{ paddingTop: '3vh' }}>
                      <Col span={12}>
                        <Form.Item style={{ ...formItemStyles }}>
                          <Button
                            type="primary"
                            style={{ ...buttonStyles, background: '#35AE9A' }}
                            onClick={() => {
                              setName('')
                              setCodechef('')
                              setCodeforces('')
                              setAtcoder('')
                              setSpoj('')
                              setUva('')
                            }}
                          >
                            Clear
                          </Button>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item style={{ ...formItemStyles }}>
                          <Button
                            type="primary"
                            style={{ ...buttonStyles, background: '#35AE9A' }}
                            onClick={() => {
                              // console.log(name, codechef, codeforces, atcoder, spoj, uva)
                              handleClick(
                                name,
                                codechef,
                                codeforces,
                                atcoder,
                                spoj,
                                uva
                              )
                            }}
                          >
                            Update your profile
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Space>
              </Row>
            </Space>
          </Col>
          <Col
            span={12}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={image} style={{ transform: 'scale(0.8)' }} alt="Login" />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default UpdateProfile
