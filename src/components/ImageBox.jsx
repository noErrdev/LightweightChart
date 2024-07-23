/* eslint-disable react/prop-types */
const ImageBox = (props) => {
      const { url, content } = props;
      
      return (
        <div className="flex flex-col justify-start">
          <div className="border border-gray-400 rounded-md overflow-hidden">
            <img src={url} alt={content} width={400} height={200} className="rounded-t-md" />
          </div>
          <div className="text-left text-xs text-gray-900">
            {content}
          </div>
        </div>
      );
    };
    
    export default ImageBox;
    