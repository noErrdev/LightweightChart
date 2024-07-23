const SponsorChild = (props) => {
      // eslint-disable-next-line react/prop-types
      const { url, content } = props;
  
      return (
          <div className="w-full h-full flex justify-start items-center gap-5">
              <div>
                  <img 
                      src={url} 
                      alt={content} 
                      width={100} 
                      height={100} 
                      className="rounded-full" 
                  />
              </div>
              <div className="pt-2 text-center text-sm text-gray-900">
                  {content}
              </div>
          </div>
      );
  };
  
  export default SponsorChild;
  