import React, { useState } from 'react'
import axios from 'axios'

const UserSettings = () => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: any) => {
    setFile(e[0])
  }

  const handleFileUpload = () => {
    const selectedFile = file as File
    console.log(selectedFile)
    const formData = new FormData()
    formData.append('file', selectedFile)

    axios.post('/img_upload', formData, {
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total)
      }
    })
  }
  return (
    <div>
      <h1>Set your profile picture</h1>
      <input
        type='file'
        onChange={e => handleFileChange(e.target.files)}
      />{' '}
      <button type='submit' onClick={handleFileUpload}>
        Submit
      </button>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut turpis
        purus, venenatis quis viverra eget, dignissim eu sem. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Quisque nisi dolor,
        ornare at tincidunt et, aliquam non justo. Suspendisse eu iaculis arcu,
        posuere convallis quam. Aliquam placerat sem vel interdum consectetur.
        Duis mauris est, sagittis ac felis id, elementum eleifend dui.
        Suspendisse vestibulum, velit eu tempor feugiat, mi turpis rhoncus
        tellus, ac viverra dolor justo eu eros. Vestibulum a neque gravida,
        ullamcorper enim id, faucibus purus. Nulla nec finibus purus, a
        pellentesque ex. Quisque maximus risus nec accumsan dapibus. Phasellus
        ut est nulla. Aenean sem diam, ornare in bibendum non, pretium ac odio.
        Nunc auctor dictum nulla. Aliquam sagittis sapien ac enim malesuada, et
        dictum nibh laoreet. Nullam a rutrum odio, ac hendrerit turpis. Maecenas
        congue porttitor laoreet. Integer fringilla ac sem eu posuere. Quisque
        risus tortor, finibus sit amet tristique quis, pharetra vel nulla.
        Aliquam erat volutpat. Donec vel mauris eget odio vehicula placerat.
        Maecenas non eros sit amet ipsum iaculis auctor. Aenean faucibus et erat
        in eleifend. Aenean lectus quam, faucibus id turpis quis, auctor feugiat
        nisl. Pellentesque habitant morbi tristique senectus et netus et
        malesuada fames ac turpis egestas. Nunc cursus, arcu vel auctor luctus,
        elit nisl imperdiet est, ac tempor ex lectus ac lectus. Suspendisse a
        vehicula magna. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus. Nunc facilisis tincidunt nulla quis
        sodales. Fusce accumsan blandit nisl eget consectetur. Praesent faucibus
        lacus vel lorem suscipit commodo. Sed ultrices, felis nec luctus
        suscipit, arcu tortor hendrerit purus, sit amet mattis felis odio eget
        turpis. Mauris rhoncus, mi sit amet pharetra mollis, ligula dolor
        feugiat ex, sed maximus lacus mauris nec nisl. Nullam facilisis lacinia
        ante sed venenatis. Donec eget finibus tellus, vitae fermentum urna.
        Praesent non efficitur neque, eget consectetur nulla. Quisque accumsan,
        magna eu ullamcorper commodo, purus lorem mollis nisi, quis aliquam
        tortor risus a tortor. Curabitur metus erat, interdum non bibendum id,
        posuere nec risus. Sed hendrerit nibh et imperdiet hendrerit. Curabitur
        dapibus pharetra efficitur. Nunc nec molestie nunc. Quisque vitae turpis
        dui. Cras sit amet sagittis tellus, interdum suscipit justo. Sed non
        suscipit massa. Ut vulputate purus eget varius accumsan. Pellentesque
        consequat scelerisque luctus. Nulla id vehicula lorem. In euismod, ante
        id auctor egestas, sapien libero vestibulum lorem, quis pretium nisi
        lorem a felis. Praesent vulputate metus a mauris interdum consequat. Nam
        vel lectus sed diam imperdiet rhoncus. Integer auctor vulputate risus
        tempus bibendum. Curabitur mollis ante et nibh imperdiet tempus.
        Maecenas ac aliquam magna. Pellentesque ac sagittis urna. Nam congue
        pellentesque lobortis. Ut bibendum odio in urna accumsan semper. Quisque
        tempus ligula sit amet ullamcorper vestibulum. Proin at gravida ex.
        Quisque at diam ante. Phasellus rutrum lorem mi, nec tempor orci commodo
        et. Aliquam imperdiet eget orci facilisis auctor. Aenean mattis vel
        mauris non vulputate. Fusce at tempus dui, sed dignissim eros. In semper
        nec augue nec tempus. Praesent varius, purus at lobortis consequat, nisi
        leo commodo dolor, at pretium orci metus ut est. In hac habitasse platea
        dictumst. Proin suscipit, lacus ut maximus feugiat, risus erat porttitor
        metus, ut interdum ligula libero non lacus. Phasellus at finibus nibh.
        Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis ut
        maximus massa, a pellentesque odio. In molestie, nisi in commodo tempus,
        sem massa auctor est, at eleifend ligula lacus id lectus. Praesent a
        ipsum nec velit ultricies suscipit in tincidunt elit. Mauris id ex
        sapien. In quis nulla mattis, maximus odio at, faucibus nibh. Vestibulum
        ipsum augue, pretium in convallis eget, congue vitae lectus. Praesent
        pulvinar elit non ornare eleifend. Sed nulla risus, eleifend vitae
        mattis ac, viverra at justo. Nam ac feugiat lectus. Suspendisse quis
        eros eget nisl accumsan bibendum. Aenean egestas ultrices metus eu
        commodo. Sed accumsan, lacus vitae semper euismod, diam justo fermentum
        risus, sit amet posuere sapien tellus ut ipsum. Donec malesuada magna
        eget consequat porttitor. Phasellus non est a sem auctor congue ut sit
        amet mauris. Donec at felis a lectus porta accumsan eget non metus.
        Proin rutrum, arcu at posuere efficitur, massa tortor porttitor arcu, ac
        faucibus felis ante ut tellus. Quisque id quam vitae tortor sagittis
        lacinia. Nunc eu porta risus. Nunc ut felis molestie, gravida lectus
        eget, scelerisque est. Phasellus feugiat nec ante et euismod. Aliquam ex
        risus, tincidunt et nunc eu, luctus interdum diam. Donec in vestibulum
        arcu, ut aliquet enim. Donec tincidunt aliquet posuere. Pellentesque in
        odio massa. In hac habitasse platea dictumst. Maecenas dolor arcu,
        vehicula at tortor id, accumsan placerat mauris. Nunc finibus augue
        justo, ac pulvinar lorem tincidunt in. Integer ut rhoncus mi. Nam ac
        justo varius, varius lorem vitae, aliquet mauris. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Aenean at semper odio. Suspendisse
        potenti. Sed sit amet tortor a ligula ultricies gravida. Nullam vitae
        sapien sit amet tortor maximus pharetra id eu lorem. Sed sodales nisl
        felis. Ut metus ligula, accumsan eget dictum ac, blandit vel felis. Duis
        egestas ligula nibh, eu auctor elit hendrerit in. Nulla vehicula et ante
        quis hendrerit. Donec fringilla malesuada felis, ac molestie sapien
        aliquet a. Ut odio felis, finibus porta neque ut, posuere finibus dui.
        Vivamus tempor justo sit amet odio ornare dignissim. Integer facilisis
        lectus nunc, a accumsan dolor tincidunt ac. Morbi sit amet ipsum id
        sapien efficitur suscipit nec eget ex. Proin vulputate ultricies diam ac
        lacinia. In bibendum justo vulputate pulvinar suscipit. Sed bibendum
        sapien vel nulla feugiat hendrerit sed a tortor. Donec scelerisque purus
        arcu, id dignissim risus pretium ut. Suspendisse pulvinar nisl non massa
        tristique, sed tempor massa convallis. Nunc porttitor tellus eu felis
        pharetra tincidunt. Morbi tincidunt nibh eu iaculis dictum. Orci varius
        natoque penatibus et magnis dis parturient montes, nascetur ridiculus
        mus. Donec lectus ligula, commodo ut congue a, gravida ut arcu. Integer
        in scelerisque purus, eget sodales sapien. Suspendisse potenti.
        Phasellus cursus semper eros vitae elementum. Nunc elit libero,
        tincidunt vitae accumsan vel, mollis at tortor. Etiam nec mi at neque
        consectetur vestibulum at a lectus. In magna purus, fermentum non
        efficitur quis, tincidunt non eros. Vivamus tincidunt tincidunt erat ac
        euismod. Phasellus interdum a risus suscipit lacinia. Phasellus
        pharetra, lorem quis pellentesque volutpat, lorem dui faucibus est, eget
        mattis ligula felis aliquam ex. Sed ut sodales lectus. Donec semper eros
        sem, nec sollicitudin lacus ultricies id. Integer eget nibh diam. Donec
        tincidunt lectus et sem porttitor, sit amet feugiat libero pharetra. In
        pharetra hendrerit urna, quis bibendum leo vulputate quis. Cras massa
        nisl, blandit quis ligula non, facilisis efficitur mi. Aliquam metus
        elit, bibendum at porttitor sit amet, finibus vel lorem. Phasellus
        libero quam, tempor vel dignissim at, iaculis eu nunc. Vestibulum ac
        sodales elit. Morbi eleifend ut ipsum id tincidunt. Maecenas vel
        ultrices mi, nec tincidunt lacus. Aenean pulvinar diam justo, at
        porttitor leo eleifend imperdiet. Fusce mi quam, mattis ac turpis nec,
        imperdiet mattis ligula. Etiam semper nulla sed lacus pharetra varius.
        Vestibulum non feugiat nisl. Suspendisse potenti. Duis non ante sed est
        imperdiet molestie. In sed neque at eros efficitur imperdiet non in
        libero. Nulla facilisi. Mauris aliquet velit fermentum urna viverra
        sagittis et a dui. Duis tempor, justo a malesuada vulputate, nulla nisi
        ornare lectus, ac volutpat nisl arcu a magna. Ut ultrices eu ligula
        volutpat scelerisque. Proin in ipsum elementum, luctus justo sit amet,
        congue tortor. Fusce magna sapien, tincidunt eu ornare gravida,
        convallis sit amet elit. Pellentesque nibh ante, faucibus a egestas
        vitae, elementum eget est. Integer dolor eros, euismod vitae aliquet eu,
        fermentum a libero. Vestibulum varius placerat porta. Quisque vehicula
        non est eget molestie. Suspendisse ultricies maximus ligula eget cursus.
        Vestibulum vehicula vehicula quam, at porta lectus consequat vel. Nunc
        ornare placerat nulla eget varius. Cras scelerisque ac arcu eu
        fermentum. Cras tellus augue, mattis vitae vestibulum sed, efficitur et
        augue. Sed justo purus, tristique in ex rutrum, consequat feugiat metus.
        Maecenas sit amet aliquet erat. Mauris mauris sapien, volutpat id tempus
        at, porttitor vitae tellus. Vestibulum lacinia mauris nec mi elementum
        cursus. Nullam scelerisque egestas eros, vel maximus ante luctus ut. In
        rhoncus convallis tempus. Donec id fringilla nunc. Integer sit amet
        lacus sit amet elit sodales malesuada quis eget libero. Ut convallis
        aliquam enim id dignissim. Suspendisse suscipit enim et fringilla
        convallis. Quisque egestas lectus id diam lacinia viverra. Morbi
        dignissim nisi sit amet venenatis cursus. Mauris aliquam scelerisque
        elit. Praesent ac aliquam velit, non eleifend diam. Fusce porttitor
        cursus risus in rhoncus. In hac habitasse platea dictumst. Curabitur
        consectetur dui sit amet urna porttitor aliquam. Fusce lectus leo,
        sollicitudin id elit a, vestibulum dictum ex.
      </p>
    </div>
  )
}

export default UserSettings
