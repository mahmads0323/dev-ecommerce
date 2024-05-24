
const Star = ({ filled }: {filled: true | false}) => {
  return (
    <span>
      {filled ? '⭐' : '☆'}
    </span>
  );
};

export default Star;