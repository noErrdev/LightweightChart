import { useState, useEffect } from "react";
import Table from "../components/Table";
import { sendPromptToChatGPT } from "../utils/api";

const Summary = (props) => {
  // eslint-disable-next-line react/prop-types
  const data = props.data;
  const arr = [data];
  const [response, setResponse] = useState('');
  const predefinedPrompt = props.prompt;

  useEffect(() => {
    if (predefinedPrompt) {
      const fetchResponse = async () => {
        const result = await sendPromptToChatGPT(predefinedPrompt);
        setResponse(result);
      };

      fetchResponse();
    }
  }, [predefinedPrompt]);

  function formatDollarAmount(sentence) {
    return sentence.replace(/(\d+\.\d+)/g, (match) => {
      // Convert the matched amount to a number
      const amount = parseFloat(match.replace('$', ''));
      // Format the amount to two decimal places
      const formattedAmount = amount.toFixed(2);
      // Return the formatted amount with the dollar sign
      return `${formattedAmount}`;
    });
  }

  const formattedSentence = formatDollarAmount(response);

  return (
    <div className="mx-auto p-4 sm:px-4 bg-secondary shadow-lg">
      <div className="">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
          {arr ? <Table data={arr} /> : null}
        </div>
      </div>
      <div className="bg-[#f6f8fa] rounded-sm shadow-lg border-1 border-[#f0f3fa] mt-4 p-4">
        <p className="text-gray-700">
          {formattedSentence}
        </p>
      </div>
    </div>
  );
};

export default Summary;
