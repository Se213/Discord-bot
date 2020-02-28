module.exports = {
    name: 'calc',
    description: "Calculates final grade off of grade weight and average",
    execute(msg, args){
        weight = [];
        grade = [];
        var answer = 0.0;
        var total = 0.0;
        for(var i=1; i < args.length; i+=2){
            var add = parseFloat(args[i]);
            weight.push(add);
        }
        for(var i = 2; i<args.length; i+=2){
            var add = parseFloat(args[i]);
            grade.push(add);
        }
        for(var i = 0; i < weight.length; i++){
            total += weight[i];
        }
        
        if(total == 1){
            for(var i = 0; i < weight.length; i++){
                answer += (weight[i] * grade[i]);
            }
        }else{
            msg.author.send('Your grade weight did not add to 100%');
        }
        msg.author.send('Your final average is: ' + answer);
    }
}