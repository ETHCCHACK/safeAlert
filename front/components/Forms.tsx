//Safe Alert - Hackathon ETHCC5
import React, {useState} from "react";
import {createStyles, makeStyles, Typography,Paper,Button} from "@material-ui/core";
import CustomTextField from "./CustomTextField";
import CustomDropDown from "./CustomDropDown";
import { useSession } from "../components/Session";
import Index from "../pages/index";
import jsPDF from "jspdf";
const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts:true
   });

const PRIVY_API_KEY = 'lBDJpmLUcACj353vU7y73_aAMc4MulIEhNPxHyoYPM0=';
const PRIVY_API_SECRET = 'cTUCAJagH1vjJFcrNgy7TVpSK0WEPj6aBP-LcCgAb1M=';

const useStyles = makeStyles(() => createStyles({
    form : {
        display : "flex",
        flexDirection : "column",
    },
    container : {
        backgroundColor : "#ffffff",
        position : "relative",
        top : "50%",
        left : "50%",
        transform : "translate(-50%,-50%)",
        padding : 30,
        textAlign : "center"
    },
    title : {
        margin:"0px 0 20px 0"
    },
    button : {
        margin:"20px 0",
        color:"white"
    }
}))

type Values = {
    protocole : string,
    linkbug : string,
    impact : string,
    severity : string,
    description : string,
    pob : string,
    walletadd : string

}


const protocoles = [
    {value : "AAVE",label :"AAVE"},
    {value : "CURVE",label :"CURVE"},
    {value : "1INCH",label :"1INCH"},
    {value : "SNX",label :"SNX"},
    {value : "COMETH",label :"COMETH"}
]

const impacts = [
    {value : "Transaction",label :"Transaction"},
    {value : "Consensus manipulation",label :"Consensus manipulation"},
    {value : "Double-Spending",label :"Double-Spending"},
    {value : "Other",label :"Other"}
]

const severitys = [
    {value : "Informational",label :"Informational"},
    {value : "Low",label :"Low"},
    {value : "Medium",label :"Medium"},
    {value : "Hard",label :"Hard"},
    {value : "Critical",label :"Critical"}
]

const Forms = () => {

    const session = useSession();
    const classes = useStyles();
    const [values,setValues] = useState<Values>({
        protocole : "",
        linkbug:"",
        impact :"",
        severity:"",
        description:"",
        pob:"",
        walletadd:""
    });

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values,[event.target.name] : event.target.value});
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        createMessage(values);
        event.preventDefault();
        console.log(values)
        savePDF();
        
    }

    const savePDF = () => {
        doc.text("\n\nHello, you have a new Bug Bounty request" +"\n\n"+
        "Protocol :\n "+values.protocole +"\n \n"+ 
        "Impact :\n "+values.impact+"\n\n"+
        "Severity : \n "+values.severity+"\n\n"+
        "Link toward the code that contains the bug :\n "+values.linkbug+"\n\n"+
        "Description of the bug :\n "+values.description+"\n\n"+
        "White Hat proof of bug :\n "+values.pob+"\n\n"+
        "You can know chat anonymously with the White Hat hacker :\n"+session.address+"\n\n"+
        "Stay safe - SAFE ALERT PROTOCOL", 1,1)
        
        doc.save("WHrequest.pdf");  

      };

    async function createMessage(message:Values):Promise<void>{
        const result = await session.privy.put(session.address, [
          {field:'protocole', value: message.protocole},
          {field:"linkbug",value:message.linkbug},
          {field:"impact",value:message.impact},
          {field:"severity",value:message.severity},
          {field:"description",value:message.description},
          {field:"pob",value:message.pob},
          {field:"walletadd",value:message.walletadd}
      
        ]);
        console.log('it works !');
        const getresult = await session.privy.get(session.address, 'description');
        console.log(getresult!.text())
      }

    return (
        <Paper className={classes.container}>
            <Typography variant={"h4"} className={classes.title}>Create a Report</Typography>
            <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
                <CustomDropDown label={"Protocol"} name={"protocole"} changeHandler={handleChange} values={protocoles} currentValue={values.protocole}/>
                <CustomTextField changeHandler={handleChange} label={"Link toward the bug"} name={"linkbug"}/>
                <CustomDropDown label={"Impact of the bug"} name={"impact"} changeHandler={handleChange} values={impacts} currentValue={values.impact}/>
                <CustomDropDown label={"Severity"} name={"severity"} changeHandler={handleChange} values={severitys} currentValue={values.severity}/>
                <CustomTextField changeHandler={handleChange} label={"Description of the bug"} name={"description"}/>
                <CustomTextField changeHandler={handleChange} label={"Proof of Bug (script that contains the operations to reproduce to exploit the bug)"} name={"pob"}/>
                <CustomTextField changeHandler={handleChange} label={"Your ERC20 Contact Address "} name={"walletadd"}/>
                <Button type={"submit"} variant={"contained"} className={classes.button}>Submit</Button>
            </form>
        </Paper>
    );
}

export default Forms;