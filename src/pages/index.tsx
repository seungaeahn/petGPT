import React from "react";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: fit-content;
  position: relative;
  z-index: 1;
`;

const Search = styled.div`
  width: 60%;
  border-radius: 20px;
  border: 1px solid #bbb;
  margin: 10px 0;
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  width: calc(100% - 100px);
  outline: none;
`;

const Button = styled.button`
  border: none;
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
`;

export default function Main() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuestion(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("./api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAnswer(data.answer);
      setQuestion(""); // 질문 초기화
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Container>
        <p></p>
        <Search>
          <Input
            type="text"
            value={question}
            onChange={onChange}
            placeholder="궁금한 점을 물어보세요."
          />
          <Button type="submit" onClick={handleSubmit}>
            질문하기
          </Button>
        </Search>
        <div>{answer}</div>
      </Container>
    </>
  );
}
