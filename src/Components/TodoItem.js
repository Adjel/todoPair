import React from "react";
import styled from "styled-components";

export default function TodoItem({ title, isCompleted }) {
  return (
    <Wrapper>
      <label htmlFor="title"></label>
      <div>{title}</div>
      <label htmlFor="completed">Completed</label>
      <input
        type="checkbox"
        id="completed"
        name="completed"
        checked={isCompleted}
      ></input>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
`;
