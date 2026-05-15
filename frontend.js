// 화면을 조립하는 도구인 React와, 
// 화면의 글자(상태)를 기억하고 바꿔줄 마법 상자(useState)를 가져옵니다.
import React, { useState } from 'react';

function App() {
  // snack은 현재 화면에 보여줄 글자이고, setSnack은 그 글자를 바꿔주는 마법 지팡이입니다!
  // 처음 화면이 켜졌을 때는 "버튼을 눌러보세요!"라는 글자를 기억해둡니다.
  const [snack, setSnack] = useState("버튼을 눌러보세요!");

  // 🏃‍♂️ 버튼을 눌렀을 때 실행될 '서버로 심부름 보내기' 명령서입니다.
  const callServer = () => {
    // 백엔드 서버의 주소입니다. localhost는 '지금 내가 쓰고 있는 이 컴퓨터'라는 뜻이에요.
    const BACKEND_IP = "localhost"; 

    // fetch: 심부름꾼을 출발시키는 기능입니다! 
    // "우리 서버의 5000번 문으로 가서 '/api/snack' 메뉴를 달라고 해!"
    fetch(`http://${BACKEND_IP}:5000/api/snack`)
      // 1. 서버가 상자(res)를 주면, 그 상자의 포장을 뜯어서 알아보기 쉽게(json) 만듭니다.
      .then(res => res.json())
      // 2. 포장을 뜯어서 나온 내용물(json)을 사용합니다.
      .then(json => {
        // 마법 지팡이(setSnack)를 휘둘러서, 화면에 있던 글자를 서버가 준 간식 이름(json.text)으로 바꿉니다!
        setSnack(json.text);
      })
      // 🚨 만약 서버가 꺼져있거나 인터넷이 끊겨서 길을 잃었다면(catch)?
      .catch(err => {
        console.error("연결 실패!", err); // 개발자만 보는 창에 빨간 글씨로 실패 이유를 적고
        alert("서버가 켜져 있는지 확인해보세요!"); // 사용자 화면에는 경고 팝업창을 띄워줍니다.
      });
  };

  // 🎨 화면에 보여질 그림(디자인)을 그리는 부분입니다. (HTML과 아주 비슷해요)
  return (
    // style={{ ... }} 부분은 글자가 가운데 오게 하거나, 여백을 주는 등 화면을 예쁘게 꾸며주는 옷 같은 역할입니다.
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      
      {/* 화면 맨 위에 보일 큰 제목입니다. */}
      <h1 style={{ color: '#ff416c' }}>오늘 방과 후 간식은? 🍢</h1>

      {/* onClick={callServer}: 이 버튼을 클릭(Click)하면 아까 만든 callServer 심부름꾼이 곧바로 출발합니다! */}
      <button 
        onClick={callServer} 
        style={{ 
          fontSize: '24px', padding: '15px 30px', 
          backgroundColor: '#ff4b2b', color: 'white', 
          border: 'none', borderRadius: '10px', 
          cursor: 'pointer', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        간식 룰렛 돌리기!
      </button>

      {/* 중괄호 {snack}을 쓰면, 우리가 아까 마법 상자에 기억해둔 간식 이름이 이 자리에 쏙 들어갑니다. */}
      <h2 style={{ color: '#333', fontSize: '40px', marginTop: '40px' }}>
        {snack}
      </h2>
      
    </div>
  );
}

// 우리가 정성껏 만든 App 화면을 다른 곳에서도 쓸 수 있게 밖으로 내보내줍니다.
export default App;