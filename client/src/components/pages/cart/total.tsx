import ProceedPaymentButton from "./proceedPaymentButton";

type TotalProps = {
  total: number,
  produtCount: number
}

const Total = ({total, produtCount}:TotalProps) => {
  return (
    <section className="flex justify-between items-center p-4 border-b border-bunker">
      <div className="flex flex-col space-y-2">
        <p>
          <span className="text-base font-medium">Items:</span>{" "}
          {produtCount}
        </p>
        <p>
          Total: <span>&#36;{total}</span>
        </p>
      </div>
      <ProceedPaymentButton />
    </section>
  );
};

export default Total;
