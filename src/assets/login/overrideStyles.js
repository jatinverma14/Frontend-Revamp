const typeStyles = {
  fontFamily: "'Poppins', sans-serif",
  color: '#ffffff',
  letterSpacing: '0.005rem',
}
const buttonStyles = {
  border: '#35AE9A',
  display: 'block',
  width: '100%',
  borderRadius: '8px',
  fontSize: '0.8rem',
}
const inputStyles = {
  opacity: '0.5',
  fontSize: '0.8rem',
  color: '#ffffff',
  padding: '8px 11px',
}
const formItemStyles = {
  marginBottom: '0.8rem',
}
const overrideStyles = `


    .ant-input .ant-input-lg:hover{
        border:1px solid #35AE9A;
    }
    .ant-form-vertical .ant-form-item-label, .ant-col-24.ant-form-item-label, .ant-col-xl-24.ant-form-item-label{
        padding: 0;
        opacity: 0.7;
    }
    .ant-input-affix-wrapper-lg{
        padding: 8px 11px;
        font-size: 0.8rem;
    }
    .ant-divider-horizontal.ant-divider-with-text-center::before,
    .ant-divider-horizontal.ant-divider-with-text-center::after
    {
        border-top: 1px solid #2D3748;
    }

    .ant-radio-checked .ant-radio-inner{
    border-color: rgb(0,0,0,0) !important ;
    }

    .ant-radio-checked .ant-radio-inner:after{
    background-color: #35AE9A;
    }

    .ant-radio:hover .ant-radio-inner {
    border-color: #2D3748 ;
    }
    .ant-input-affix-wrapper .ant-input-affix-wrapper-lg .ant-input-password{
        font-size:0.8rem;
    }

    .ant-input-affix-wrapper{
        background-color: rgb(0,0,0,0);
    }

    .ant-radio-inner{
        background-color: #2D3748;
        border-color:#2D3748;
    }
    .ant-input:focus, .ant-input:hover,.ant-input-lg:focus, .ant-input-lg:hover{
        border:1px solid #35AE9A;
    }
    `
