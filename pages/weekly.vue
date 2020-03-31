<template>
    <div>
        <h1>本周</h1>
        <b-button v-b-toggle.price-input variant="success">添加数据</b-button>
        <b-collapse id="price-input" class="mt-2">
            <b-alert :show="showLoginAlert">登录后添加数据<b-btn variant="link" to="/login">/login</b-btn></b-alert>
            <p v-if="loggedIn">
                <b-form @submit="updatePrice">
                    <b-form-group
                        id="ig-time"
                        label="时间:"
                        label-for="i-time"
                        description="">
                        <b-form-select v-model="updateForm.type" :options="selectTimeOptions"></b-form-select>
                    </b-form-group>
                    <b-form-group
                        id="ig-price"
                        label="价格"
                        label-for="i-price">
                        <b-form-input type="number" min="1" v-model="updateForm.price" required></b-form-input>
                    </b-form-group>
                    <b-button type="submit" variant="primary">提交</b-button>
                </b-form>
            </p>
        </b-collapse>
        
        
        <line-chart :chartData="chartData" :options="chartOptions"></line-chart>
        <b-table striped hover small bordered fixed :items="tableData"></b-table>
    </div>
</template>

<script>
import LineChart from '~/components/LineChart.vue'
// import Logo from '~/components/Logo.vue'

const timeOptions = [
    {value: 'buy', 'text': '购买价格'},
    {value: 'day1_am', 'text': '周一 上午'},
    {value: 'day1_pm', 'text': '周一 下午'},
    {value: 'day2_am', 'text': '周二 上午'},
    {value: 'day2_pm', 'text': '周二 下午'},
    {value: 'day3_am', 'text': '周三 上午'},
    {value: 'day3_pm', 'text': '周三 下午'},
    {value: 'day4_am', 'text': '周四 上午'},
    {value: 'day4_pm', 'text': '周四 下午'},
    {value: 'day5_am', 'text': '周五 上午'},
    {value: 'day5_pm', 'text': '周五 下午'},
    {value: 'day6_am', 'text': '周六 上午'},
    {value: 'day6_pm', 'text': '周六 下午'},
];
let chartLabels = timeOptions.map((item) => { return item.text; })

export default {
    components:{
        LineChart
    },
    data() {
        return {
            price: {},
            targetUserID: "",
            selectTimeOptions: timeOptions,
            updateForm: {
                type: "",
                price: "",
                week: ""
            },
            chartData: null,
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            },
            tableData: [],
        }
    },
    computed: {
        loggedIn() {
            return this.$auth.loggedIn;
        },
        showLoginAlert() {
            return !this.loggedIn
        },
    },
    mounted() {
        if (this.$route.hash != "") {
            this.targetUserID = this.$route.hash.substring(1);
        }

        this.updateData()
        // this.renderChart(this.chartdata, this.options)
    },
    methods: {
        async updateData() {
            try {
                let {data} = await this.$axios.get('user/price')
                console.log(data)
                this.price = data.price;
                this.updateChart();
            }catch(e) {
                console.error(e)
                alert('read user failed' + e)
            }
        },
        updateChart() {
            let price = this.price;
            var priceList = [];
            timeOptions.forEach((item) => {
                console.log(item)
                priceList.push(price[item.value])
            })

            var reverseList = priceList.reverse()
            console.log(reverseList);
            var list = []; var isPush = false;
            reverseList.forEach((item)=> {
                if (isPush) {
                    list.push(item)
                    return;
                } 
                if (item == 0) {
                    return
                } else {
                    isPush = true
                    list.push(item)
                }
            });
            var chartData = {
                labels: chartLabels,
                datasets: [{
                    label: '价格',
                    backgroundColor: '#ffab00',
                    data: []
                }]
            };
            chartData.datasets[0].data = list.reverse();

            console.info('chartData', chartData)
            this.chartData = chartData

            var tableData = [];
            var linePrice = {};
            var linePercent = [];
            timeOptions.forEach((item) => {
                let row = {
                    '-': item.text,
                    '价格': price[item.value],
                    '较购买价': (price[item.value] / price.buy * 100).toFixed(2) + ' %',
                    '预测价格': '-',
                }
                tableData.push(row)
            })
            this.tableData = tableData;

        },
        async updatePrice(evt) {
            evt.preventDefault()
            console.log(JSON.stringify(this.updateForm))
            
            try {
                var postData = this.updateForm
                postData.price = parseInt(postData.price)
                let {data} = await this.$axios.post('user/price/update', this.updateForm)
                if (!data.ok) {
                    alert('update failed')
                    return
                }
                this.price = data.price
                this.updateChart();
            }catch(e) {
                alert("Err:" + data.err)
                return
            }
        }
    },
}
</script>