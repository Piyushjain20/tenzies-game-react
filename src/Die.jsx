export default function Die(props) {
  const { id, isFixed, currentNumber } = props.myState;
  return <div className={isFixed ? `die--box selected face${currentNumber}` : `die--box face${currentNumber}`} onClick={(event) => props.selectDie(event, id)}></div>;
}
