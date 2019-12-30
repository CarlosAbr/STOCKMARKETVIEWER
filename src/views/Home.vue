<template>
  <div class="home">
    <v-layout wrap>
      <v-flex xs12 md5 lg5>
            <v-layout class="pt-5 pl-5 pb-0 pr-5 list_content info" justify-center align-center wrap>
                <v-flex align-self-center xs6 md12 lg12>
                    <h4 class="white--text">
                        Search companies by symbol
                    </h4>
                </v-flex>
                <v-flex  class="textfield_search mt-5">
                   <input v-model="busqueda" type="text" placeholder="Search Symbol">
                    <img @click="search_method" src="../assets/Asset_Search.svg" alt="">
                </v-flex>
            </v-layout>
            <v-layout justify-center>
                <v-flex id="tap_gain_companies" @click="show_gain_companies()" class="active_tap pt-3 pb-3" text-center xs6>Top Gain Companies</v-flex>
                <v-flex id="tap_active_companies" @click="show_active_companies()" class="pt-3 pb-3" text-center xs6>Top Most Active Companies</v-flex>
            </v-layout>

            <v-layout justify-center>
                <v-flex>
                    <ul id="gain_companies_ul" v-for="(item, index) of topSymbolsArray" :key="index" style="padding: 0; list-style:none;">
                        <li @click="refreshDetail(index)">
                            <div class="pt-3 pb-3 pl-4 pr-4 table_row">
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <h5>{{topSymbolsArray[index].companyName}}</h5>

                                    </v-flex>
                                    <v-flex xs12 justify-center align-center justify-start>
                                        <span>
                                            {{topSymbolsArray[index].symbol}}
                                        </span>
                                        <span>
                                            {{index + 1}}
                                        </span>

                                    </v-flex>
                                </v-layout>
                            </div>
                        </li>
                    </ul>

                      <ul id="active_companies_ul" v-for="(item, index) of topSymbolsArray" :key="index" style="padding: 0; list-style:none;" >
                        <li @click="refreshDetail(index)">
                            <div class="pt-3 pb-3 pl-4 pr-4 table_row">
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <h5>active companie name</h5>

                                    </v-flex>
                                    <v-flex xs12 justify-center align-center justify-start>
                                        <span>
                                            active companie symbol
                                        </span>
                                        <span>
                                            {{index + 1}}
                                        </span>

                                    </v-flex>
                                </v-layout>
                            </div>
                        </li>
                    </ul>
                </v-flex>
            </v-layout>

      </v-flex>
      <v-flex  class="pt-5 pl-5 pb-0 pr-5 detail_content" xs12 md7 lg7>
        <v-layout id="select_company_display" align-center style="height:100vh;" wrap>
          <v-flex>
              <img style="width:100px;" src="@/assets/Asset_Graphic.svg" alt="">
              <p class="display-0">Select a company to display data</p>
          </v-flex>
        </v-layout>
            <div id="detail_company_display">
              <v-layout wrap>
                  <v-flex xs12>
                      <h1 id="companyName_Detail"></h1>
                      <p id="symbol_Detail"></p>
                  </v-flex>
              </v-layout>
              <v-layout wrap>
                  <v-flex xs12 md6 lg6>
                      <h5>STOCK VALUE</h5>
                      <div><span class="display-1"><b id="stock_value">1.55 USD</b></span> <span id="stock_tax_value">+0.020</span></div>
                      <p>At close: 4:00 PM EST</p>
                  </v-flex>
                  <v-flex xs12 md6 lg6>
                      <h5>SECTOR</h5>
                      <p id="sector_Detail">SIC-7311 Services-Advertising Agencies Technology Services</p>
                  </v-flex>
              </v-layout>
              <v-layout wrap="">
                <v-flex xs12>
                  <Grafica></Grafica>
                </v-flex>
              </v-layout>
            </div>
      </v-flex>
    </v-layout>



  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios'
import { Bar } from 'vue-chartjs'
import Grafica from '../components/Grafica.vue'

export default {
  extends:Bar,
  name: 'home',
  data(){
    return{
       symbolsArray: [],
       topSymbolsArray: [],
       busqueda: 'asdas'
    }
  },
  components:{
    Grafica
  },
      methods:{
        search_method(){
          let flag = false;

          for(let i=0; i<= this.symbolsArray.length; i++)
          {

            if(this.busqueda == this.symbolsArray[0].symbol){
              flag=true
            }
            else{
              flag=false
            }

          }

          if(flag){
            console.log('existe');
          }else{
            console.log('no existe');
          }
        },
        show_gain_companies(){
          document.getElementById('gain_companies_ul').classList.add('active_ui');
          document.getElementById('gain_companies_ul').classList.remove('desactive_ui');
          
          document.getElementById('active_companies_ul').classList.add('desactive_ui');
          document.getElementById('active_companies_ul').classList.remove('active_ui');

          document.getElementById('tap_gain_companies').classList.add('active_tap');
          document.getElementById('tap_active_companies').classList.remove('active_tap');

        },
        show_active_companies(){
          document.getElementById('gain_companies_ul').classList.add('desactive_ui');
          document.getElementById('gain_companies_ul').classList.remove('active_ui');

          document.getElementById('active_companies_ul').classList.add('active_ui');
          document.getElementById('active_companies_ul').classList.remove('desactive_ui');
          
          document.getElementById('tap_gain_companies').classList.remove('active_tap');
          document.getElementById('tap_active_companies').classList.add('active_tap');

        },
        refreshDetail(i){
          console.log(this.topSymbolsArray[i].companyName);
          console.log(this.topSymbolsArray[i].symbol);
          console.log(this.topSymbolsArray[i].sector);

          document.getElementById('select_company_display').classList.add('desactive_ui');
          document.getElementById('detail_company_display').classList.add('active_ui');

          document.getElementById('companyName_Detail').textContent = this.topSymbolsArray[i].companyName;
          document.getElementById('symbol_Detail').textContent = this.topSymbolsArray[i].symbol;
          document.getElementById('sector_Detail').textContent = this.topSymbolsArray[i].sector;
          document.getElementById('stock_value').textContent = this.topSymbolsArray[0].stockValue;
          document.getElementById('stock_tax_value').textContent = (this.topSymbolsArray[0].stockValue*0.05)+' '+ this.topSymbolsArray[0].currency
        },
    
        async getSymbolsInfo(){
          
                //method vars
                let InfoCompany = []

                //request for list of symbols
                let SymbolsList = await axios.get('https://sandbox.iexapis.com/stable/ref-data/symbols?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb',{ params:{
                  _limit:"5"
                }})
                this.symbolsArray = await SymbolsList.data
                console.log(SymbolsList.data)
                //fill array with info
                for(let i = 0; i<= 1; i++){
                    let Cashdata = await axios.get('https://sandbox.iexapis.com/stable/stock/'+ this.symbolsArray[i].symbol +'/cash-flow?period=annual&token=Tsk_f780f7a36d8b4865b6dfb4906488adfb')    
                    let SymbolInfo = await axios.get('https://sandbox.iexapis.com/stable/stock/'+ this.symbolsArray[i].symbol +'/company?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb')
                    let StockValueCompany = await axios.get('https://sandbox.iexapis.com/stable/stock/'+ this.symbolsArray[0].symbol +'/dividends/5y?token=Tsk_f780f7a36d8b4865b6dfb4906488adfb')
                    console.log(StockValueCompany)
                         InfoCompany.push(
                        {
                            symbol: this.symbolsArray[i].symbol,
                            income: Cashdata.data.cashflow[0].cashFlow,
                            companyName: SymbolInfo.data.companyName,
                            sector: SymbolInfo.data.sector,
                            stockValue: StockValueCompany.data[0].amount,
                            currency: StockValueCompany.data[0].currency

                        })
                }
                //order array
                this.topSymbolsArray = InfoCompany.sort((a, b) => parseFloat(a.income) - parseFloat(b.income));
                console.log("topSymbolsArray: ")
                console.log(this.topSymbolsArray)
                //add stockValue

                },

        },
   

    created(){
        this.getSymbolsInfo()
    },


}
</script>

<style scoop>
.textfield_search{
  background-color:white;
  display:flex;
  padding:10px 10px;
  border-radius: 35px;
  justify-content:flex-start;
  align-content: center;
  margin-bottom:20px;
  
}
.textfield_search input{
  outline: none;
  width:100%;
  color:Grey;
  font-size:14px;
  

}
.textfield_search img{
  width:20px;
  cursor:pointer;
}

.textfield_search img:hover{
  opacity: .5;
}
  #active_companies_ul{
    display:none !important;
  }
 #detail_company_display{
   display:none;
 }
  .active_ui{
    display:block !important;
  }
  .desactive_ui{
    display:none !important;
  }

.table_row{
  box-shadow: 0px -5px 12px rgb(230, 230, 230);
}
.table_row:hover{
  background-color:rgb(243, 243, 243);
  cursor:pointer;
}

.detail_content{
  background-color:rgb(243, 243, 243);
  height:100vh;
}

#tap_gain_companies:hover{
   background-color:rgb(202, 202, 202);
  color:white;
  font-weight: bold;
}
#tap_active_companies:hover{
   background-color:rgb(202, 202, 202);
  color:white;
  font-weight: bold;
}
#tap_gain_companies{
  cursor:pointer;
  background-color:rgb(243, 243, 243);
  border-radius: 0px 0px 10px 0px;
  z-index: 1;
}
#tap_active_companies{
  cursor:pointer;
  background-color:rgb(243, 243, 243);
  border-radius: 0px 0px 0px 10px;
  z-index: 1;
}
.active_tap{
  background-color:grey !important;
  color:white;
  font-weight: bold;
}
</style>