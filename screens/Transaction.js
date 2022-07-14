import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions"
import { BarCodeScanner } from "expo-barcode-scanner";
import { askAsync } from "expo-permissions";
export default class TransactionScreen extends Component {
    constructor (props){
        super(props);
        this.state={
            dormState:"normal",
            hasCameraPermissions:null,
            scaned:false,
            scaneddata:""
        }
    }
    handleBarcodeScanned = async({type,data}) =>{
        this.setState({
            scanneddata:data,
            dormState:"normal",
            scanned:true
        })
    }
        
    
    getCameraPermissions = async dormState=>{
        const{status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
        hasCameraPermissions:status==="granted",
        dormState:dormState,
        scaned:false
        })
    }
    
    render(){
        const {dormState,hasCameraPermissions,scaneddata,scaned}=this.state
        if (dormState === "scanner"){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}
                style = {StyleSheet.absoluteFillObject}
                />
                
            )
        }
        return(
            <View style = {styles.container}>
                <Text style = {styles.text}>
                    {hasCameraPermissions?scaneddata:"request for camera permission"}
                </Text>
                <TouchableOpacity style = {styles.buttontext}
                onPress = {()=>this.getCameraPermissions("scanner")}
                >
                <Text style = {styles.buttontext}>scan qrcode</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"blue"
},
Text:{
    color:"white",
    fontSize:30
},
buttontext:{
    fontSize:24,
    color:"black"
},
button:{
    width:"43%",
    height:55,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white",
    borderRadius:15
}
})