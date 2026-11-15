// Two equally numerous buyer types (one representative buyer of each type).
// Demand P_i = A_i - q; common constant MC, sunk fixed cost, no resale.
export function discriminationModel({degree='first',high=80,low=55,cost=10,fixed=160,lowQuantity=null}={}){
 if(!['single','first','second','third'].includes(degree)||!Number.isFinite(high)||high<70||high>110||!Number.isFinite(low)||low<35||low>65||!Number.isFinite(cost)||cost<5||cost>30||!Number.isFinite(fixed)||fixed<0||fixed>1000)throw new RangeError('Unsupported discrimination settings');
 const value=(a,q)=>a*q-.5*q*q,efficientHigh=high-cost,efficientLow=low-cost,optimalLow=Math.max(0,2*low-high-cost);
 const chosenLow=lowQuantity===null?optimalLow:Math.max(0,Math.min(efficientLow,lowQuantity));
 if(lowQuantity!==null&&!Number.isFinite(lowQuantity))throw new RangeError('Invalid menu quantity');
 let qH,qL,tH,tL;
 if(degree==='first'){qH=efficientHigh;qL=efficientLow;tH=value(high,qH);tL=value(low,qL);}
 if(degree==='second'){qH=efficientHigh;qL=chosenLow;tL=value(low,qL);tH=value(high,qH)-(high-low)*qL;}
 if(degree==='third'){qH=efficientHigh/2;qL=efficientLow/2;tH=(high-qH)*qH;tL=(low-qL)*qL;}
 let uniformPrice=null;
 if(degree==='single'){
  const candidates=[cost,low,high,Math.min(low,(high+low+2*cost)/4),Math.max(low,(high+cost)/2)];
  let best=-Infinity;for(const p of candidates){const h=Math.max(0,high-p),l=Math.max(0,low-p),ps=(p-cost)*(h+l);if(ps>best){best=ps;uniformPrice=p;qH=h;qL=l;}}
  tH=uniformPrice*qH;tL=uniformPrice*qL;
 }
 const types=[{name:'Higher-demand buyer',a:high,q:qH,bill:tH},{name:'Lower-demand buyer',a:low,q:qL,bill:tL}].map(t=>({...t,efficient:t.a-cost,cs:value(t.a,t.q)-t.bill,ps:t.bill-cost*t.q,dwl:.5*(t.a-cost-t.q)**2,price:t.q?t.bill/t.q:null,marginalValue:t.a-t.q}));
 const q=qH+qL,revenue=tH+tL,ps=revenue-cost*q,cs=types.reduce((s,t)=>s+t.cs,0),dwl=types.reduce((s,t)=>s+t.dwl,0),efficientSurplus=.5*(efficientHigh**2+efficientLow**2);
 return{degree,high,low,cost,fixed,types,q,revenue,ps,profit:ps-fixed,cs,dwl,total:cs+ps,efficientSurplus,optimalLow,chosenLow,uniformPrice,highOwnUtility:value(high,qH)-tH,highOtherUtility:value(high,qL)-tL,lowOwnUtility:value(low,qL)-tL,lowOtherUtility:value(low,qH)-tH};
}
