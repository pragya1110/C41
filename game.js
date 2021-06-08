class Game{
    constructor(){}

    getState(){
    
        var gamestateRef= database.ref('gameState');
        gamestateRef.on("value",function(data){
        gameState=data.val();

        });
    }

    update(state){
        database.ref('/').update({gameState:state});
    }

   async start(){
        if(gameState===0){
            player=new Player();

            var playerCountref= await database.ref('playerCount').once("value");

            if(playerCountref.exists()){
                playerCount= playerCountref.val();
                player.getCount();
            }
           
            form=new Form();
            form.display();
        }

        car1=createSprite(100,200);
        car1.addImage(car1img);
        car2=createSprite(300,200);
        car2.addImage(car2img);
        car3=createSprite(500,200);
        car3.addImage(car3img);
        car4=createSprite(700,200);
        car4.addImage(car4img);

        cars=[car1,car2,car3,car4]
    }
    play(){
        var index=0;
        var x=175;
        var y=0;
        form.hide();
        
        textSize(30);
        text("Game Start",120,100);

        Player.getPlayerInfo();
        player.getCars_at_end();

        if(allPlayers!==undefined){
            var display_position=130;

            background("#c68767");
            image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5);
            
            for(var plr in allPlayers){
                index=index+1;
                x=x+200;
                y=displayHeight-allPlayers[plr].distance;
                
                cars[index-1].x=x;
                cars[index-1].y=y;

                if(index==player.index){
                    fill("red");
                    ellipse(x,y,60,60);
                   cars[index-1].shapeColor="red";
                   camera.position.x=displayWidth/2
                   camera.position.y=cars[index-1].y;
                }else{
                    fill("black");
                }
                display_position+=20;

            textSize(15);
            text(allPlayers[plr].name+":"+allPlayers[plr].distance,120,display_position);
            }

            
        }

        if(keyDown(UP_ARROW) && player.index!==null){
            player.distance+=50;
            player.update();
        }
        if(player.distance>3860){
            gameState=2;
            player.rank+=1;
            Player.updateRank(player.rank);
        }

        drawSprites();
    }

    end(){
        console.log("game ended");
        console.log(player.rank);
    }
}