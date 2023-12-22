module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    if(date){
    return date.toLocaleDateString();
    }else{
      return 'No date provided.'
    }
  },
  is_equal_one: (rating) => {
    if(rating == 1){
      return true;
    }
  },
  is_equal_two: (rating) => {
    if(rating == 2){
      return true;
    }
  },
  is_equal_three: (rating) => {
    if(rating == 3){
      return true;
    }
  },
  is_equal_four: (rating) => {
    if(rating == 4){
      return true;
    }
  },
  is_equal_five: (rating) => {
    if(rating == 5){
      return true;
    }
  }
 
};
