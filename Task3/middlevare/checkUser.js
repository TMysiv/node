const checkUser = ({params},res,next) => {
    try {
        const id = params.id;

        if (!oneUser){
            const error = 'Такого юзера не існує';
            res.render('error',{error});
            return
        }


    } catch (e) {

    }
}