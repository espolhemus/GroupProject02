module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    if(date){
    return date.toLocaleDateString();
    }else{
      return 'No date provided.'
    }
  },
 
};
