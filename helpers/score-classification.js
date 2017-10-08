'use strict';
function scoreClasification(nilai){
  if (nilai >85){
    return 'A'
  }else if (nilai> 70 && nilai<=85) {
    return 'B'
  }else if (nilai> 55 && nilai<=70) {
    return 'C'
  }else if (nilai<=55 && nilai>=1) {
    return 'D'
  }else{
    return 'Empty'
  }
}

module.exports = scoreClasification;
