export const P0=50,Q0=100;
export function calculate({ed=0.8,es=1.2,policy='none',amount=12}={}) {
 const control=policy==='floor'||policy==='ceiling';
 if(!(ed>=0.4&&ed<=3&&es>=0.4&&es<=3&&amount>=0&&amount<=(control?100:25))||!['none','tax','subsidy','floor','ceiling'].includes(policy))throw new RangeError('Inputs outside the supported market range');
 const b=P0/(ed*Q0),d=P0/(es*Q0),a=P0+b*Q0,c=P0-d*Q0;
 const w=policy==='tax'?amount:policy==='subsidy'?-amount:0;
 const binding=control&&(policy==='floor'?amount>P0:amount<P0);
 const qd=control?Math.max(0,(a-amount)/b):null,qs=control?Math.max(0,(amount-c)/d):null;
 const q=binding?Math.min(qd,qs):(a-c-w)/(b+d),pb=binding?amount:a-b*q,ps=binding?amount:c+d*q;
 const mb=a-b*q,mc=c+d*q;
 const cs=(a-pb)*q-0.5*b*q*q,producer=(ps-c)*q-0.5*d*q*q,gov=w*q;
 const baseCS=0.5*b*Q0*Q0,basePS=0.5*d*Q0*Q0,baseTotal=baseCS+basePS;
 const dwl=0.5*(b+d)*(Q0-q)**2,total=cs+producer+gov;
 return {a,b,c,d,w,q,pb,ps,mb,mc,control,binding,qd,qs,gap:binding?Math.abs(qd-qs):0,cs,producer,gov,dwl,total,baseCS,basePS,baseTotal,buyerShare:b/(b+d),sellerShare:d/(b+d),actualEd:(binding?qd:q)?pb/(b*(binding?qd:q)):null,actualEs:(binding?qs:q)?ps/(d*(binding?qs:q)):null};
}
