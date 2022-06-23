const selectors = {
  isLoading: ({loader}) => loader && loader.loading,
  textLoader: ({loader}) => loader && loader.text,
  defaultTextLoader: ({loader}) => loader && loader.defaultText,
};
export {selectors as default};
