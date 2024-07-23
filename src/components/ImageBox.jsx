/* eslint-disable react/prop-types */
const ImageBox = (props) => {
      const {url} = props;
      // eslint-disable-next-line react/prop-types
      const {content} = props;
      const {title} = props;
      return (
            <div className="flex flex-col justify-start">
                  <div className="border-1 border-gray-400 rounded-md">
                    <img src={url} alt={content} width={400} height={200} className="rounded-md">
                    </img>
                  </div>
                  <div className="py-2 text-left text-xs text-gray-900 font-semibold">{title}</div>
                  <div className="text-left text-xs text-gray-900">
                    {content}
                  </div>
            </div>
      )
}

export default ImageBox