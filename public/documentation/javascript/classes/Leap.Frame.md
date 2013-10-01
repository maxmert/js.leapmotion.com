A collection of state information fed back from the Leap Motion hardware. A frame is the "root" data unit;
it contains all the positional data that streams from the Leap Motion detector,
[Fingers/Tools/Pointables](#pointables) at a given instant in time.

See [Getting Frame Data from your Leap Motion controller](#getting_data) for documentation on getting frame information.

#### A note on `Frame.Fingers`, `Frame.pointables`, and `Frame.tools`:

![Pointables Venn](/images/pointables/pointables.png)

`Frame.fingers`', `Frame.tools` and  `Frame.pointables` are different collections of  instances of
the [Leap.Pointables](#Leap.Pointables) base class. (there is no special Leap.Tools or Leap.Fingers classs.)
* The `Frame.pointables` collections contains all the pointables whether they are fingers or tools -- from both hands.
* The `Frame.tools` collections and the `Frame.fingers` collections are exclusive; there is no pointer which can be
  found in both the fingers collection <i>and</i> the tools collection
* All pointables in these root collections are concatenations of data fromm `Frame.hands` and can be found in the `frame.hands` properties..</li>
* Any of these collections *can be empty*, if the user's hands/fingers/tools aren't picked up by the Leap Motion controller.
* All fingers/tools/pointables from both hands are stored with no ordering in these root level collections.<

  <div class="row-fluid">

    <div class="span6">
      <h4>Properties</h4>
      <dl class="dl-horizontal">
        <dt>id</dt>

        <dd><b>string</b> A unique id of this Frame instance</dd>
        <dt>pointables</dt>

        <dd><b>[<a href="#Leap.Pointable">Leap.Pointable</a>]</b> array of all fingers and tools from <b>both</b> hands.</dd>
        <dt>fingers</dt>

        <dd><b> [<a href="#Leap.Pointable">Leap.Pointable</a>]</b> array of all fingers from <b>both</b> hands.</dd>
        <dt>tools</dt>

        <dd><b>[<a href="#Leap.Pointable">Leap.Pointable</a>]</b> array of all tools from <b>both</b> hands.</dd>

        <dt>gestures</dt>

        <dd><b>[<a href="#Leap.Gesture">Leap.Gesture</a>]</b> array of zero or more detected gestures.
          Requires configuration of the <a href="#Leap.Controller">Leap.Controller</a> to be present (see
          <code>enableGestures</code>.)
        </dd>

        <dt>hands</dt>

        <dd><b>[<a href="#Leap.Hand">Leap.Hand</a>]</b> array of 0..2 Leap.Hands.</dd>
        <dt>timestamp</dt>

        <dd><b>int</b> microseconds since the Leap detector started</dd>

        <dt>valid</dt>
        <dd><b>boolean</b>
          indicates whether the frame is valid. An invalid frame contains no tracking data
          but does conform to the frame API.
        </dd>

        <dt>Invalid</dt>
        <dd><b>Leap.Frame</b> an invalid instance of a frame.</dd>
      </dl>
    </div>
    <div class="span6">
      <h4>Methods</h4>
      <dl class="dl-horizontal">

        <dt>dump</dt>

        <dd><b>(): string</b> returns a JSON-formatted string (not object) containing
          all the data of the frame.
        </dd>
        <dt>finger</dt>
        <dd><b>(id: string &ast;): <a href="#Leap.Pointable">Leap.Pointable</a></b>
          returns a finger from the fingers collection(see above).
        </dd>

        <dt>pointable</dt>
        <dd><b>(id: string &ast;): <a href="#Leap.Pointable">Leap.Pointable</a></b>
          returns a pointable from the pointables collection (see above).
        </dd>


        <dt>hand</dt>
        <dd><b>(id: string): <a href="#Leap.Hand">Leap.Hand</a></b>
          returns a hand from the hands collection (see above).
        </dd>

        <dt>translation</dt>
        <dd><b>(sinceFrame: int): [int/mm]</b>
          The movement, in millimeters, of <i>both</i> hands since the passed-in timestamp,
        </dd>

        <dt>scaleFactor</dt>
        <dd><b>(sinceFrame: int): float</b>
          The <a href="#scaleFactor">scale factor</a> between <i>both</i> hands since the passed-in timestamp.
        </dd>

        <dt>rotationAngle</dt>

        <dd><b>(sinceFrame: int, axis: int): float (radians -- 0..&pi;)</b>
          The angle of rotation around the rotation axis (0, 1, or 2) of <i>both</i> hands since the passed-in timestamp
          The returned angle is expressed in radians measured clockwise around the rotation axis (using the right-hand
          rule).
        </dd>

        <dt>rotationAxis</dt>
        <dd><b>(sinceFrame: int): [int]</b>
          the information described in rotationAngle, for all three axes,
          of <b>both</b> hands since the passed-in timestamp
        </dd>

        <dt>rotationMatrix</dt>
        <dd><b>(sinceFrame: integer): [int]</b>
          The transform matrix expressing the rotation derived from the overall rotational motion,
          of <b>both</b> hands since the passed-in timestamp,
          The Leap derives frame rotation from the relative change in position and orientation
          of all objects detected in the field of view.
        </dd>

      </dl>

      <hr/>
        <small>&ast; <i>Warning:</i> IDs can change between frames -- there is no guarantee that an ID from a
          previous frame will work as a parameter for subsequent calls to frame.finger(). the IDs are
          only functional within the lifespan of a single frame.
        </small>
    </div>
  </div>
</article>