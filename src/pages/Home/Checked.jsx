const Checked = () => (
  <div
    style={{
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      background: 'linear-gradient(45deg, hsl(280, 87%, 65%), hsl(200, 87%, 65%))',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
      <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
    </svg>
  </div>
);

export default Checked;
