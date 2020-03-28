$(function(){
   // 创建场景对象Scene
    var scene = new  THREE.Scene();
    var geomotry = new THREE.BoxGeometry(100,100,100);//创建一个立方体几何对象geomotry
    materials = new THREE.MeshNormalMaterial();
    var mesh = new  THREE.Mesh(geomotry,materials);//网格模型,结合几何和材质，对象
    // scene.position.set(100,100,0)
    scene.add(mesh);//网格模型添加的场景中

    //光源设置
    var point = new THREE.PointLight(0xffffff);//点光源
    point.position.set(400,200,300);//点光源位置
    scene.add(point);//点光源加载到场景中

    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);//往场景中添加环境光

    //摄像机设置
    var width = window.innerWidth * 0.5;//窗口宽度
    var height = window.innerHeight * 0.3;//窗口宽度
    var k = width / height;//窗口宽高比
    var s = 100;//三维场景显示范围控制参数，参数越大，显示的范围越大；
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s*k,s*k,s,-s,1,1000);
    camera.position.set(200,300,200);//设置相机位置
    camera.lookAt(scene.position);//设置相机方向(指向的场景对象)

    //创建渲染对象
    var renderer = new  THREE.WebGLRenderer();
    renderer.setSize(width,height);//设置渲染区域尺寸
    renderer.setClearColor(0xfaf9f5,1);//设置背景颜色
    //添加到一个节点里面
    // var box = document.getElementsByClassName("box")[0];
    // document.body.box.appendChild(renderer.domElement);
    $(".box-3D").append(renderer);

    function  render() {//物体旋转，从而实现旋转观察
        renderer.render(scene,camera);//执行渲染操作
        mesh.rotateY(0.01);//设为每次绕y轴旋转0.0.2弧度
        mesh.rotateX(0.02);//设为每次绕x轴旋转0.0.1弧度
        requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
    }
    render(); 
})
